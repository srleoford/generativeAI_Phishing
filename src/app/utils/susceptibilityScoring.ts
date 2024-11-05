import { EmailData } from "../emails/_components/EmailContainer";

/**
 * Each Susceptibility score will have an observation, a score, and a specific stat
 * For now, booleans will be converted to 0 or 1 and an average of all emails will be
 * computed for a stat. The time will be recorded straight into the score
 */
interface Susceptibility {
    observation: string,
    score: number,
    stat: string,
}

/**
 * Helper function for calculating averages for observation points
 */
const average = (array: number[]) =>
    array.reduce((a, b) => a + b, 0) / array.length

/**
 * For each email and each interaction, store the stats into an array for statistical calculations
 * to quantify the recorded information into a score
 * @param answers
 * @requires answers.length == length of a block of emails
 */
export const createSusceptibilityScoring = async (
    answers: EmailData[]
)=> {
    let mouseHovers: number[] = []
    let clickBehavior: number[] = []
    let time: number[] = []
    let interactSend: number[] = []
    let attachments: number[] = []

    answers.forEach(answer => {
        mouseHovers.push(answer.interactions.mouseHoverOverLinks ? 1 : 0)
        clickBehavior.push(answer.interactions.clickingBehavior ? 1 : 0)
        time.push(answer.interactions.timeSpent)
        interactSend.push(answer.interactions.senderInteraction ? 1 : 0)
        attachments.push(answer.interactions.openingAttachments ? 1 : 0)
    })


    const scores: Record<string, Susceptibility> = {
        mouseHovers: {
            observation: "Mouse Hover Over Links",
            score: mouseHoverScore(mouseHovers),
            stat: average(mouseHovers).toString()
        },
        clickingTrend: {
            observation: "Clicking Behavior",
            score: clickBehaviorScore(clickBehavior),
            stat: average(clickBehavior).toString()
        },
        timeSpent: {
            observation: "Time Spent on Email",
            score: timeSpentScore(time, 60, 180),
            stat: average(time).toString()
        },
        senderInteraction: {
            observation: "Interaction with Sender Information",
            score: senderInteractionScore(interactSend),
            stat: average(interactSend).toString()
        },
        openAttach: {
            observation: "Opening Attachments",
            score: openingAttachmentScore(attachments),
            stat: average(attachments).toString()
        }
    }

    return scores
}

/**
 * This will be how the susceptibility score for Mouse hover over links will be calculated. If the average is 0, there's
 * a high risk. If the average is stats.length, there's a low risk. Everything in between is moderate risk
 * @param stats
 * @requires stats != undefined && stats.length > 0
 */
const mouseHoverScore = (stats: number[]) => {
    const avg = average(stats)
    switch (avg) {
        case 0:
            return 3
        case stats.length:
            return 1
        default:
            return 2
    }
}

/**
 * The average is computed to whether there were clicks or not. If the average clicks is 0, the risk
 * is low. The clicks are always, the risk is high. Anything in between is considered moderate
 * @param stats
 * @requires stats != undefined && stats.length > 0
 */
const clickBehaviorScore = (stats: number[]) => {
    const avg = average(stats)
    switch (avg) {
        case 0:
            return 1
        case stats.length:
            return 3
        default:
            return 2
    }
}

/**
 * This takes in the range which is established to be immediate, moderate, and plenty of time that
 * is spent on an email. Start and end is the range for the moderate amount of time and anything below
 * is considered immedate and greater is considered plenty of time
 * @param stats
 * @param start
 * @param end
 * @requires stats != undefined && stats.length > 0
 * @requires start > 0 && end < max(stats)
 */
const timeSpentScore = (stats: number[], start: number, end: number) => {
    const avg = average(stats)
    switch (true) {
        case (0 < avg && avg < start):
            return 3
        case (avg > start && avg < end):
            return 2
        default:
            return 1
    }
}

/**
 * This calculates the interaction with the sender information to see if they checked who sent the email
 * If the average is 0, the risk is high. If the average is stats.length, the risk is low. Everything in
 * between is moderate
 * @param stats
 * @requires stats != undefined && stats.length > 0
 */
const senderInteractionScore = (stats: number[]) => {
    const avg = average(stats)
    switch (avg) {
        case 0:
            return 3
        case stats.length:
            return 1
        default:
            return 2
    }
}

/**
 * Calculates opening attachments of each email. If the average is 0, the risk is low. If the average
 * is stats.length, the risk is high. Everything in between is considered moderate risk. This should be amended
 * later to account for what is considered unexpected or convincing attachments
 * @param stats
 * @requires stats != undefined && stats.length > 0
 */
const openingAttachmentScore = (stats: number[]) => {
    const avg = average(stats)
    switch (avg) {
        case 0:
            return 1
        case stats.length:
            return 3
        default:
            return 2
    }
}