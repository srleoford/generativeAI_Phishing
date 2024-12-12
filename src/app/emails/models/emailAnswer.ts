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

/*
 * Email Interaction State Management Functions
 *
 * These functions manage the state of user interactions with emails in a phishing simulation tool.
 * Each function updates a specific aspect of the email interaction data and triggers a state update.
 */

/**
 * Marks that a user hovered over a link in a specific email.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setHoverOverLink(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.mouseHoverOverLinks = true
    emailsState[1](newEmailsData)
}

/**
 * Marks that a user clicked within a specific email.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setClickingBehavior(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.clickingBehavior = true
    emailsState[1](newEmailsData)
}

/**
 * Records the time spent on a specific email.
 * @param {number} timeSpent - The amount of time spent on the email.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setTimeSpent(timeSpent: number, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.timeSpent = timeSpent
    emailsState[1](newEmailsData)
}

/**
 * Marks that a user interacted with the sender of a specific email.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setSenderInteraction(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.senderInteraction = true
    emailsState[1](newEmailsData)
}

/**
 * Marks that a user opened an attachment in a specific email.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setOpeningAttachments(emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.openingAttachments = true
    emailsState[1](newEmailsData)
}

/**
 * Records the user’s response to a specific email.
 * @param {boolean} response - Whether the user’s response was correct.
 * @param {string} choice - The user’s selected choice.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setResponse(response: boolean, choice: string, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.isCorrect = response
    newEmailsData[emailIndex].interactions.choice = choice
    //emailsState[1](newEmailsData)
}

/**
 * Sets the suggested action.
 * @param {string} action - The suggested action for the user.
 * @param {number} emailIndex - The index of the email in the emailsState array.
 * @param {[EmailData[], Dispatch<SetStateAction<EmailData[]>>]} emailsState - The state array and updater function.
 */
export function setSuggestedAction(action: string, emailIndex: number, emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>]) {
    const newEmailsData = [...emailsState[0]]
    newEmailsData[emailIndex].interactions.suggestedAction = action
    emailsState[1](newEmailsData)
}