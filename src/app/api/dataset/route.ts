import {NextResponse} from "next/server";
import emails from "../dataset/PhishingDataset_HFES2020.json"
import {EmailData} from "@/app/emails/_components/EmailContainer";
import {emptyEmailAnswer} from "@/app/emails/models/emailAnswer";

// Transforms dataset into objects of type EmailData
const mapEmails = (emailData: any): EmailData => {
    return {
        id: emailData.Email_ID,
        body: emailData.Email,
        subject: emailData.Subject,
        date: "Nov 23, 2024, 11:25 AM",
        from: emailData.Sender,
        emailType: emailData.Email_type,
        feedbackMessage: "",
        interactions: emptyEmailAnswer()
    }
}

const emailDataset = emails.map(mapEmails)

// Shuffle the array
function shuffleArray(array: EmailData[]): EmailData[] {
    return array.sort(() => Math.random() - 0.5);
}

export async function GET() {
    // Get five random elements from the dataset
    const randomElements = shuffleArray(emailDataset).slice(0, 5)
    return NextResponse.json(randomElements, {status: 200})
}