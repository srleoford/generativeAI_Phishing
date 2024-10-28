'use server'

import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
import { useRouter } from 'next/navigation'

dotenv.config();

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
const defaultVector = new Array(14).fill(0).map(() => Math.random() * 10).map(x => x.toFixed(1));
const api_key = process.env.PINECONE_API_KEY
const indexName = process.env.PINECONE_INDEX
const router = useRouter()

// Need to fix this
const pc = new Pinecone({
    apiKey: api_key
});

const hasIndex = async (index: string) => {

    // Is the there an index name
    if (index === '') {
        return false
    }

    // Retrieve the list of indexes to check if expected index exists
    const indexes = (await pc.listIndexes())?.indexes;
    if (!indexes || indexes.filter((i: { name: string; }) => i.name === index).length !== 1) {
        return false
    }
    else
        return true
}

/**
 * This checks if there exists a namespace i.e., user inserted into the Pinecone DB
 * @param index
 * @param namespace
 * @requires index exists in DB, namespace != ""
 */
const hasNamespace = async (index: string, namespace: string) => {
    const { namespaces } = await pc.index(index).describeIndexStats()
    return namespaces.hasOwnProperty(namespace)
}
/**
 * This checks if a user with the given userEmail exists in a specified index.
 * @param index
 * @param userEmail
 * @returns resolves to true if the user exists, otherwise false.
 */
export const userExists = async (index: string, userEmail: string): Promise<boolean> => {
    try {
        // Fetch the user by email from the specified index
        const result = await pc.index(index).fetch([userEmail]);
        return result && result.records[userEmail] !== undefined;
    } catch (error) {
        console.error(`Error checking user existence by user email in index ${index}:`, error);
        return false;
    }
};

/**
 * This will upsert into Pinecone DB for new users. The namespace will be the user's email. This requires to be vectors
 * inserted into the record as well, so any non-zero default values are fine since it doesn't matter until the initial
 * survey is finished.
 * @param indexName
 * @param userEmail
 * @param token
 * @requires userEmail != "" && userEmail not in DB, indexName != "" && token != ""
 */
export const insertUser = async(userEmail: string, token: string) =>{
    // Constants for the function
    console.log(`Index name is ${indexName}`)

    try {
        // Get the Pinecone index
        const index = await hasIndex(indexName) ? pc.index(indexName) : "";

        const userRecord = [
            {
                id: userEmail,
                values: defaultVector,
                metadata: { email: userEmail, token: token }
            }
        ]
        if (await userExists(indexName, userEmail)) {
            return router.push("/declinedSurvey");
        }
        // This needs to check if the user exists before inserting. If not, `redirect("/declinedSurvey")` or some
        // other page.
        pc.describeIndex(indexName)
        await index.upsert(userRecord)
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
}


export const insertSurveyData = async(surveyData: string, email: string, token: string)=> {
    try {

        if (!surveyData || email === '') {
            return false;
        }
    
        // Get the Pinecone index
        const index = await hasIndex(indexName) ? pc.index(indexName) : "";
        console.log(email)

        //Do a query to see if the user email exists
        const queryResponse = await index.query({
            id: email,
            topK: 1,
            includeValues: true,
        });

        //If the query response is successfull update the metadata of the corresponding email. Where ID is email
        if (queryResponse){
            await index.update({
                id: email,
                metadata: { surveyAnswers: surveyData}
            });
        }
        
        else{
            return false
        }
        
    }
    catch (error) {
        console.error(error)
        return false
    }
}