import {NextRequest, NextResponse} from "next/server";
import {generate} from "@/app/utils/openai";
import {EmailData} from "@/app/emails/_components/EmailContainer";
import {emptyEmailAnswer} from "@/app/emails/models/emailAnswer";

/**
 * Defines the structure of the request body for generating emails.
 */
export interface RequestBody {
    profile: string
    difficulty: number
    numberOfEmails: number
}

/**
 * Handles POST requests for generating emails based on user input.
 * @param {NextRequest} requestBody - The incoming POST request.
 */
export async function POST(requestBody: NextRequest) {
    const body: RequestBody = await requestBody.json()
    const generatedEmails = await generate(body.profile, body.difficulty, body.numberOfEmails) || ""

    const jsonEmails:{ emails: [] } = JSON.parse(generatedEmails)

    const emails: EmailData[] = jsonEmails.emails.map((email: {
        id: number;
        body: string;
        subject: string;
        date: string;
        from: string;
        emailType: string;
        feedbackMessage: string
    }) => (
        {
            id: email.id,
            body: email.body,
            subject: email.subject,
            date: email.date,
            from: email.from,
            emailType: email.emailType,
            feedbackMessage: email.feedbackMessage,
            interactions: emptyEmailAnswer(),
            isSuggestedActionsClosed: true
        }
    ))

    return NextResponse.json(
        emails,
        {
            status: 200
        }
    )
}