import { Pinecone } from "@pinecone-database/pinecone";

export type Metadata = {
    email: string,
    token: string
}

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
const handleUser = async (user: string, namespace: string) => {
    /**
     * Need the API key and other things for this connection from
     * process.env.PINECONE_API_KEY
     */
    let api_key = process.env.PINECONE_API_KEY;
    const pinecone = new Pinecone({apiKey: api_key});

    const indexName: string = process.env.PINECONE_INDEX || '';
    if (indexName === '') {
        throw new Error('PINECONE_INDEX environment variable not set')
    }

    // Retrieve the list of indexes to check if expected index exists
    const indexes = (await pinecone.listIndexes())?.indexes;
    if (!indexes || indexes.filter(i => i.name === indexName).length !== 1) {
        throw new Error(`Index ${indexName} does not exist`)
    }

    // Get the Pinecone index
    const index = pinecone!.Index<Metadata>(indexName);

    // Get the namespace
    const pineconeNamespace = index.namespace(namespace ?? '')


    /**
 * This action connects to the DB and ensures there's an index selected to use
 */
export async function initalizeDB () {

}