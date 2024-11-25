import { EmailData } from "../_components/EmailContainer"
import { submitAnswers } from "@/app/utils/pinecone";
import { Dispatch, SetStateAction } from "react";

export interface EmailAnswer {
    mouseHoverOverLinks: boolean,
    clickingBehavior: boolean,
    timeSpent: number,
    senderInteraction: boolean,
    openingAttachments: boolean,
    choice: string,
    isCorrect?: boolean,
    suggestedAction: string
}

export function emptyEmailAnswer(): EmailAnswer {
    return {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        choice: "",
        isCorrect: undefined,
        suggestedAction: ""
    }
}

export let emailAnswer = emptyEmailAnswer()
let answers: EmailAnswer[] = []
let currentEmail: EmailData

/**
 * Pass in the email of the user to update in the metadata of the record in the DB
 * @ensures the email with the answers is passed to Pinecone to store
 */
export function sendEmailAnswers(
    token: string,
    phaseNameSpace: string,
    answers: EmailData[]
) {
    submitAnswers(
        token,
        phaseNameSpace,
        answers
    )
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
export function setResponse(response: boolean, choice: string, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.isCorrect = response
    newEmailsData[emailIndex].interactions.choice = choice
    //emailsState[1](newEmailsData)
}

export function setSuggestedAction(action: string, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.suggestedAction = action
    emailsState[1](newEmailsData)
}