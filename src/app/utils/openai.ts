import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

dotenv.config()

const openaiApiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: openaiApiKey
})

const generateEmailFormat = z.object({
    id: z.number().describe("Start from 1001"),
    body: z.string().describe("HTML content of the email generated"),
    subject: z.string().describe("Title of the email"),
    date: z.string().describe("Random date in 2024, example: Nov 23, 2024, 11:25 AM"),
    from: z.string().describe("Email generated of the sender"),
    emailType: z.enum(["Phishing", "Ham"]).describe("Ham for no phishing emails"),
    feedbackMessage: z.string().describe("Feedback to the trainee that explain why is phishing or why not")
})

const emailsArrayFormat = z.object({
    emails: z.array(generateEmailFormat).describe("Emails generated")
})

export async function generate() {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are an Email generator AI. We need you to generate training emails" },
            { role: "system", content: "Add design to the HTML generated, use css and any necessary HTML component" },
            { role: "system", content: "Be careful with the margins in the HTML" },
            { role: "system", content: "All emails should be different" },
            { role: "system", content: "Consider for design that HTML will be displayed in a white background" },
            { role: "user", content: "Generate 5 emails, phishing and no phishing (5 in total)" }
        ],
        response_format: zodResponseFormat(emailsArrayFormat, "emails_format")
    })

    return response.choices[0].message.content
}
