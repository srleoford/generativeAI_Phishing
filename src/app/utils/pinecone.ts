'use server'

import { Pinecone } from "@pinecone-database/pinecone";

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
const defaultVector = [0,1,2,3,3]
const api_key = "70be2ee3-fb42-4ce8-af7b-27b184b487a4"
const indexName = "users"

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
    if (!indexes || indexes.filter(i => i.name === index).length !== 1) {
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
        const queryResponse = await index.query({
            id: email,
            topK: 1,
            includeValues: true,
        });
        console.log(queryResponse)
        if (queryResponse){
            const userRecord = [
                {
                    id: email,
                    values: defaultVector,
                    metadata: { email: email, token: token, surveyAnswers: surveyData}
                }
            ]
            await index.upsert(userRecord)
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