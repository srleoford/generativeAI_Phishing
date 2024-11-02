import { EmailData } from "../_components/EmailContainer"
import Cookies from "js-cookie"
import { submitAnswers } from "@/app/utils/pinecone";
import { Dispatch, SetStateAction } from "react";

export interface EmailAnswer {
    mouseHoverOverLinks: boolean,
    clickingBehavior: boolean,
    timeSpent: number,
    senderInteraction: boolean,
    openingAttachments: boolean,
    isCorrect?: boolean
}

export function emptyEmailAnswer(): EmailAnswer {
    return {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
    }
}

export let emailAnswer = emptyEmailAnswer()
let answers: EmailAnswer[] = []
let currentEmail: EmailData

/**
 * Pass in the email of the user to update in the metadata of the record in the DB
 * @requires Cookies.get("email") !== "" && Cookies.get("email") in DB
 * @ensures the email with the answers is passed to Pinecone to store
 */
export async function sendEmailAnswers(emails: EmailData[]) {
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

export function setHoverOverLink(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.mouseHoverOverLinks = true
    emailsState[1](newEmailsData)
}
export function setClickingBehavior(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.clickingBehavior = true
    emailsState[1](newEmailsData)
}
export function setTimeSpent(timeSpent: number, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.timeSpent = timeSpent
    emailsState[1](newEmailsData)
}
export function setSenderInteraction(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.senderInteraction = true
    emailsState[1](newEmailsData)
}
export function setOpeningAttachments(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.openingAttachments = true
    emailsState[1](newEmailsData)
}
export function setResponse(response: boolean, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.isCorrect = response
    emailsState[1](newEmailsData)
}