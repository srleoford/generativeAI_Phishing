import {NextResponse} from "next/server";
import emails from "../dataset/PhishingDataset_HFES2020.json"

export interface DatasetEmail {
    emailId: number,
    sender: string,
    subject: string,
    email: string,
    emailtype: string,
    clusterNo: number
}

// Transforms dataset into objects of type DatasetEmail
const mapEmails = (emailData: any): DatasetEmail => {
    return {
        emailId: emailData.Email_ID,
        sender: emailData.Sender,
        subject: emailData.Subject,
        email: emailData.Email,
        emailtype: emailData.Email_type,
        clusterNo: emailData.Cluster_no,
    };
};

const emailDataset = emails.map(mapEmails)

// Shuffle the array
function shuffleArray(array: DatasetEmail[]): DatasetEmail[] {
    return array.sort(() => Math.random() - 0.5);
}

export async function GET() {
    // Get five random elements from the dataset
    const randomElements = shuffleArray(emailDataset).slice(0, 5)
    return NextResponse.json(randomElements, {status: 200})
}