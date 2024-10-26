import { EmailData } from "../_components/EmailContainer"

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

export function sendEmailAnswers() {
    console.log(answers)
    answers = []
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