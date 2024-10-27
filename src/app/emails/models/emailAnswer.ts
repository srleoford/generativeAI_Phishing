import { EmailData } from "../_components/EmailContainer"
import Cookies from "js-cookie"
import { submitAnswers } from "@/app/utils/pinecone";

export interface EmailAnswer {
    mouseHoverOverLinks: boolean,
    clickingBehavior: boolean,
    timeSpent: number,
    senderInteraction: boolean,
    openingAttachments: boolean,
    isCorrect: boolean,
    email: EmailData
}

export function emptyEmailAnswer(): EmailAnswer {
    return {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: false,
        email: {
            body: "",
            subject: "",
            date: "",
            from: "",
            to: "",
            emailType: ""
        }
    }
}

let emailAnswer = emptyEmailAnswer()
let answers: EmailAnswer[] = []

/**
 * Pass in the email of the user to update in the metadata of the record in the DB
 * @requires Cookies.get("email") !== "" && Cookies.get("email") in DB
 * @ensures the email with the answers is passed to Pinecone to store
 */
export async function sendEmailAnswers() {
    //This should grab the email from the cookie to be used for insertion
    const email = Cookies.get("email");
    console.log(`Sending answers of user ${email} to DB`)

    /** TODO: This needs to grab the email answers as 'block#-email#': 'phish' or 'real' */
    const result = await submitAnswers("users", email, [])
    return result
}

export function resetAnswers() {
    answers.push(emailAnswer)
    emailAnswer = emptyEmailAnswer()
}

export function setHoverOverLink() {
    emailAnswer = {
        ...emailAnswer,
        mouseHoverOverLinks: true
    }
    
}
export function setClickingBehavior() {
   emailAnswer = {
        ...emailAnswer,
        clickingBehavior: true
    }
}
export function setTimeSpent(timeSpent: number) {
    emailAnswer = {
        ...emailAnswer,
        timeSpent: timeSpent
    }
}
export function setSenderInteraction() {
    emailAnswer = {
        ...emailAnswer,
        senderInteraction: true
    }
}
export function setOpeningAttachments() {
    emailAnswer = {
        ...emailAnswer,
        openingAttachments: true
    }
}
export function setResponse(response: boolean) {
    emailAnswer = {
        ...emailAnswer,
        isCorrect: response
    }
}

export function setEmail(email: EmailData) {
    emailAnswer = {
        ...emailAnswer,
        email: email
    }
}