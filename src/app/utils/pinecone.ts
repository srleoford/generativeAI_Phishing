'use server'

import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
import { EmailData } from "../emails/_components/EmailContainer";
import { createSusceptibilityScoring } from "@/app/utils/susceptibilityScoring";

// Initialize the .env variables
dotenv.config();

// Default values for Pinecone such as the default vector for user creation, Pinecone API, etc.
const defaultVector = new Array(parseInt(process.env.USER_INDEX_SIZE, 10)).fill(0).map(() =>
    Math.random() * 10).map(x => x.toFixed(1));
const api_key = process.env.PINECONE_API_KEY
const indexName = process.env.PINECONE_INDEX
const resultsIndexName: string = process.env.RESULTS_INDEX || "default"


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
 * This method will check to make sure there is a record for the user for various functions
 * @param indexName
 * @param email
 * @requires indexName exists in DB
 * @requires email != ""
 * @ensures \result == record with ID email from DB
 */
const hasRecord = async (index: string, email: string) => {
    const thisIndex = await hasIndex(index) ? pc.index(index) : "";

    if (index !== "") {
        const record = await thisIndex.fetch([email])
        if (!record.records.hasOwnProperty(email)) {
            console.log(`No record '${email}' exists in '${index}'`)
            return false
        }
        else {
            console.log(`Found record ${email}!`)
            return true
        }
    }
    return false
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
 * @param indexName (this should be inserted later for more usability)
 * @param userEmail
 * @param token
 * @requires userEmail != "" && userEmail not in DB, indexName != "" && token != ""
 */
export const insertUser = async(userEmail: string, token: string) =>{


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
            return false;
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

/**
 * This will update the vector values with the new values from the survey or responses with susceptibility scores
 * NOTE: This will replace the entire vector, so the size must match and old values need to be preserved. This needs
 * to be structured some way
 *
 * Give the method an index and vector (array of values) and splice the array:
 * [\old(first half)] + [new vector] + [\old(rest of vector)]
 *
 * @param userEmail
 * @param vector
 * @parm block
 * @requires indexName == existing index in DB
 * @requires userEmail == existing record in DB
 * @requires block == blockOne || blockTwo || blockThree
 * @requires vector == type Array[number] && vector.length == 5
 * @ensures \result == \old(array[0:block] + vector + \old(array[block + blockSize:\old(array.length)]
 */
export const updateBlockScores = async (userEmail: string, indexName: string, vector: any, block: number) => {
    try {
        // Get the Pinecone index
        const index = await hasIndex(indexName) ? pc.index(indexName) : "";

        if (index !== "" && await hasRecord(indexName, userEmail)) {
            // Grab the existing record
            let oldVector = await pc.index(indexName).fetch([userEmail])
            // console.log(`The plan is to insert vector ${vector} into ${oldVector.records[userEmail].values.toString()} at block ${block}`)

            let oldBegVector = oldVector.records[userEmail].values.splice(0, block)
            let oldEndVector = oldVector.records[userEmail].values.splice(blockSize)
            // console.log(`First half: ${oldBegVector}, Last half at ${block + 5}: ${oldEndVector}`)
            let newVector = oldBegVector.concat(...vector, ...oldEndVector)
            // console.log(`New vector: ${newVector}`)

            await index.update({
                id: userEmail,
                values: newVector,
            })
        }
        else {
            return false
        }
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

        else {
            return false
        }
    }
    catch (error) {
        console.error(error)
        return false
    }
}

/**
 * This will update the metadata to store the answers for the questions. The key will be 'block#-email#' and the value
 * will be either 'phish' or 'real'. This will depend on the block the user is in and which email they answered.
 *
 * @param answers
 * @ensures \result == \old(record.metadata) + \old(record.metadata).append(answers)
 */
export const submitAnswers = async (
    token: string,
    phaseNameSpace: string,
    answers: EmailData[]
) => {
    const thisIndex = await hasIndex(resultsIndexName) ? pc.index(resultsIndexName) : ""

    const emailInteractions = answers.map(answer => (
        {
            emailId: answer.id,
            interactions: answer.interactions
        }
    ))

    // Stores the values for each correct answer
    const vector = []
    emailInteractions.forEach((interaction) => {
        vector.push(interaction.interactions.isCorrect ? 1 : 0)
    })

    //stores the interactions for insertion into metadata
    const jsonString = JSON.stringify(emailInteractions)

    // Creates the indices and values for the sparse vector for susceptibility scores
    const scores = await createSusceptibilityScoring(answers)
    const sparseIndices = [1,2,3,4,5]
    const sparseValues = []

    // Pushes the value for each observation point's score
    for (const key in scores) {
        const { score, stat } = scores[key]
        sparseValues.push(score)
    }


    try {
        if (thisIndex !== "") {
            await thisIndex.namespace(phaseNameSpace).upsert([
                {
                    id: token,
                    values: vector,
                    sparseValues: {
                        'indices': sparseIndices,
                        'values': sparseValues
                    },
                    metadata: { results: jsonString, scores: JSON.stringify(scores) },
                }
            ])
        }
    }
    catch (error) {
        console.error(error)
    }
}