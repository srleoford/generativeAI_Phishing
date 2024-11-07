// import { GPT2LMHeadModel, GPT2Tokenizer } from "@huggingface/transformers"
import axios from "axios";
import { pipeline } from '@huggingface/transformers'


// const API_URL = 'https://api-inference.huggingface.co/models/loresiensis/distilgpt2-emailgen-phishing';  // Change this to the model you're using
const API_URL = 'http://127.0.0.1:5000/generate'
const API_TOKEN = "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";  // Replace with your Hugging Face API token

/** Most basic example of using chatGPT2.0 works! */
// Function to make the API request
// async function generateText(inputText) {
//     try {
//         const response = await axios.post(
//             API_URL,
//             { inputs: inputText },
//             {
//                 headers: {
//                     Authorization: `Bearer ${API_TOKEN}`,
//                 },
//             }
//         );
//
//         // Check the API response
//         const generatedText = response.data[0]?.generated_text || 'No output received';
//         console.log('Generated Text:', generatedText);
//     } catch (error) {
//         console.error('Error calling Hugging Face API:', error.response?.data?.error || error.message);
//     }
// }
//
// const inputText = 'Once upon a time, in a land far, far away...';
// generateText(inputText);

const generateEmail = async (input: string) => {
    try {
        const response = await axios.post(
            API_URL,
            { inputs: input },
            // {
            //     headers: {
            //       Authorization: `Bearer ${API_TOKEN}`,
            //     },
            // }
        );

        console.log(response)
    }
    catch (err: any) {
        console.error('Error:', err.response ? err.response.data : err.message)
    }
}

generateEmail("Dear Customer,")

// const pipe = await pipeline('text-generation', "postbot/distilgpt2-emailgen")