import {NextResponse} from "next/server";
import {generate} from "@/app/utils/openai";
import {EmailData} from "@/app/emails/_components/EmailContainer";
import {emptyEmailAnswer} from "@/app/emails/models/emailAnswer";

export async function GET() {
    const generatedEmails = await generate() || ""

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
            interactions: emptyEmailAnswer()
        }
    ))

    return NextResponse.json(
        emails,
        {
            status: 200
        }
    )
}