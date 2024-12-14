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
        interactions: emptyEmailAnswer(),
        isSuggestedActionsClosed: true,
        startedTime: 0,
        savedTime: 0
    }
}

const emailDataset = emails.map(mapEmails)

// Shuffle the array
function shuffleArray(array: EmailData[]): EmailData[] {
    return array.sort(() => Math.random() - 0.5);
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const numberOfEmails = searchParams.get('numberOfEmails');
    // Get five random elements from the dataset
    const randomElements = shuffleArray(emailDataset).slice(0, Number(numberOfEmails))
    return NextResponse.json(randomElements, {status: 200})
}

export async function POST() {
    // Get one random attention check email
    const randomElement = shuffleArray(emailDataset.filter(email => email.emailType.toLowerCase() === 'attention_check')).slice(0, 1)
    return NextResponse.json(randomElement, {status: 200})
}