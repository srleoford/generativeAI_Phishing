'use server'

import { Pinecone } from "@pinecone-database/pinecone";
import { useRouter } from 'next/navigation'

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
const defaultVector = [0,1,2,3,3,2,1,2,3,3,2,3,2,1,2,3,2,3,2]
const api_key = "4222d20a-ce07-4185-97c5-70a29a4ba9a6"
const indexName = "users"
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