// import { NewUser } from "@/app/lib/definitions";
// import { consent } from "@/app/lib/data"
// import React from "react";
import { Pinecone, PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import dotenv from 'dotenv'
import {createSelfSignedCertificate} from "next/dist/lib/mkcert";

// console.log(consent.map(part => {
//     <p>
//         {part.title ? "" : <h3>part.title</h3>}
//                 <hr/>
//                 {part.section}
//                 </p>
//         }))

/**
 * Testing the NewUser validation and parasing
 */
// const email = "dlkj@dlkjm.com"
//
// try {
//     const surveyor = NewUser.safeParse({ email: email })
//     if (surveyor.success) {
//         const { email } = surveyor.data
//         console.log("Email: ", email, " Token: ")
//     }
//     else {
//         console.log("Invalid email! Please enter a valid email.")
//     }
// } catch (e) {
//     console.error(e)
// }

/**
 * Testing Pinecone
 */
dotenv.config()

const api_key = process.env.PINECONE_API_KEY || "";
const indexName = process.env.PINECONE_INDEX || "";
const userEmail = "user@example.com";
const token = "The quick brown fox jumped over the lazy dog"

const model = "multilingual-e5-large"

const pc = new Pinecone({
    apiKey: "72832cbe-f5c5-4dbf-aac6-a9b2e30b2bf4",
})

const data = [
    { id: "1", text: "The quick brown fox jumped over the lazy dog" }
]

const embeddings = await pc.inference.embed(
    model,
    data.map(d => d.text),
    { inputType: 'passage', truncate: 'END' }
);

console.log(embeddings);



// const hasIndex = async (index: string) => {
//
//     // Is the there an index name
//     if (index === '') {
//         return false
//     }
//
//     // Retrieve the list of indexes to check if expected index exists
//     const indexes = (await pc.listIndexes())?.indexes;
//     if (!indexes || indexes.filter(i => i.name === index).length !== 1) {
//         return false
//     }
//     else
//         return true
// }
//
//
// if (await hasIndex(indexName)) {
//     const index = pc.index(indexName);
//     const records = [
//         {
//             id: `${userEmail}1`,
//             values: [1,0,0,0],
//             metadata: { email: userEmail, token: token },
//         }
//     ]
//     await index.namespace(userEmail).upsert(records)
//     console.log(await pc.describeIndex(indexName))
//     const { namespaces } = await pc.index(indexName).describeIndexStats()
//     let result = namespaces.hasOwnProperty(userEmail)
//     console.log("Namespaces? ", result)
//
//     // Query the vector and update the value somehow
//     result = await index.query([userEmail])
//     console.log(result)
// }
