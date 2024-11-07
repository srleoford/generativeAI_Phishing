import OpenAI from "openai";
import { pipeline } from '@huggingface/transfomers'
import dotenv from "dotenv";

dotenv.config();

console.log(`OPENAI Api Key: ${process.env.OPENAI_API_KEY}`);

const openai = new OpenAI({
    apiKey: "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"
});

const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: "The quick brown fox jumped over the lazy dog.",
});

console.log(embedding.data[0].embedding.length);