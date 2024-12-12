import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import emailTemplates from '../../jsons/emailTemplates.json'
import questions from "../../jsons/questions.json"

dotenv.config()

const openaiApiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    apiKey: openaiApiKey
})

// Here we describe the information require for each email
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

/**
 * This method will generate AI phishing and no phishing emails
 * @param profile this is the user answers in the survey
 * @param difficulty set difficulty for the emails
 * @param numberOfEmails amount of emails we want to generate
 */
export async function generate(profile: string, difficulty: number, numberOfEmails: number) {
    const emails = emailTemplates.emails.map((emailBase64) => {
        return atob(emailBase64);
    })
    const generatePrompt = (numberOfEmails: number) => {
        return `Generate exactly ${numberOfEmails} ${
          numberOfEmails === 1 ? "email" : "emails"
        }, including phishing and non-phishing examples (${numberOfEmails} in total).`;
      };
    // Add details to AI model about the purpose
    // Template 0: Notification style, button in the middle.
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are an Email generator AI. We need you to generate training phishing emails" },
            { role: "system", content: "Adapt the emails using next profiling data: " + profile},
            { role: "system", content: "The questions used for the profile were: " + JSON.stringify(questions) },
            { role: "system", content: "Add design to the HTML generated, you can use css and any necessary HTML component" },
            { role: "system", content: "If you add HTML buttons, add enough margin around them" },
            { role: "system", content: "Be careful with the margins between components in the HTML" },
            { role: "system", content: "All emails should be different" },
            { role: "system", content: "Consider for design that HTML will be displayed in a white background" },
            { role: "system", content: "Use next body email as template 1, use this template in 10% of generated emails: " + emails[0]},
            { role: "system", content: "Use next body email as template 2: " + emails[1]},
            { role: "system", content: "Use next body email as template 3: " + emails[2]},
            { role: "system", content: "Use next body email as template 3: " + emails[3]},
            { role: "system", content: "Do not use the name of the email recipient on the body and subject" },
            { role: "system", content: "Adjust the difficulty of the emails according to this number: " + difficulty },
            { role: "system", content: "15 (least difficult), 5 (most difficult)" },
            { role: "user", content: generatePrompt(numberOfEmails) }
        ],
        response_format: zodResponseFormat(emailsArrayFormat, "emails_format")
    })

    return response.choices[0].message.content
}