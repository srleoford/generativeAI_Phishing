import { Pinecone } from "@pinecone-database/pinecone";

const pineconeClient = new Pinecone({apiKey: process.env.PINECONE_API_KEY});


// upsert user data into Pinecone
export async function upsertUserToPinecone(email: string, token: string) {
    const vector = Array.from({ length: 50 }, () => Math.random()); // Random vector

    // Get the index
    const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX || 'users');

    // Upsert the user's vector into Pinecone
    await pineconeIndex.upsert([
        {
            id: email, // email as unique ID
            values: vector, // vector to store
            metadata: { token }, // token associated with the user
        }
    ])
}
