'use client'

import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from 'dotenv'

dotenv.config()

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
const defaultVector = [0,1,2,3]
const api_key = process.env.PINECONE_API_KEY

// Need to fix this
const pc = new Pinecone({
    apiKey: "4222d20a-ce07-4185-97c5-70a29a4ba9a6"
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
    const indexName = process.env.PINECONE_INDEX

    try {
        // Get the Pinecone index
        const index = await hasIndex(indexName) ? pc.index(indexName) : "";

        const userRecord = {
            id: userEmail,
            values: [0,0,0,0],
            metadata: { email: userEmail, token: token }
        }

        if (await hasNamespace(indexName, userEmail)) {
            return false
        }
        else {
            await index.namespace(userEmail).upsert(userRecord)
            return true
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}