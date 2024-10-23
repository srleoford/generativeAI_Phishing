'use server'

import dotenv from 'dotenv'
import { Pinecone } from "@pinecone-database/pinecone";

// Initialize the .env variables
dotenv.config();

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
// Vector will need 14 values for the initial survey and 15 for the susceptibility scores (5 for each block)
const defaultVector = new Array(29).fill(0).map(() => Math.random() * 10).map(x => x.toFixed(1));
const api_key = process.env.PINECONE_API_KEY
const indexName = process.env.PINECONE_INDEX

// Markers for portions of the vector to overwrite when updating with susceptibility scores or the initial survey
// Each block has five observation points, a block for each of the three phases
const surveyStart = 0
const blockOne = 14
const blockTwo = 19
const blockThree = 24

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
export const insertUser = async (userEmail: string, token: string) =>{
    // Constants for the function
    // console.log(`Index name is ${indexName}`)

    // This fetches the record from index 'indexName' and then grabs the values of the vector as an array
    let result = await pc.index(indexName).fetch([userEmail])
    console.log(`Results: ${result.records[userEmail].values[0]}`)

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

/**
 * This will update the vector values with the new values from the survey or responses with susceptibility scores
 * NOTE: This will replace the entire vector, so the size must match and old values need to be preserved. This needs
 * to be structured some way
 *
 * Idea #1: Give the method an index and vector (array of values) and splice the array:
 * [\old(first half)] + [new vector] + [\old(rest of vector)]
 *
 * Idea #2: Grab the vector from the DB, create a new vector that inserts preserved old values and new values, then
 * update the record with the newly created vector
 *
 * Idea #3: Have a sparse vector to store some of these values
 *
 * @param userEmail
 * @param vector
 * @parm block
 *
 */
export const updateVector = async (userEmail: string, indexName: string, vector: any, block: number) => {
    // Grab the vector to update
    let oldVector = await pc.index(indexName).fetch([userEmail])
    let newVector = oldVector.records[userEmail].values[0:block].concat(vector).concat(oldVector[block+block:])

    try {
        // Get the Pinecone index
        const index = await hasIndex(indexName) ? pc.index(indexName) : "";

        const newVector = [
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