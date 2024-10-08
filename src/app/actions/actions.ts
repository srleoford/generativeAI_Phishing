'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function register() {
    return {}
}

/**
 * This action is for the initial page to give consent to the study. This checks the checkboxes for age, understanding,
 * and explicit participation and will not allow to move forward until all three are checked. Declining will go to
 * another page that thanks them for their interest.
 * */
export async function userConsent (
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const age = formData.get("age")
    const understood = formData.get("understood")
    const participate = formData.get("participate")
    const accepted = formData.get("accept")


    if (accepted === "true") {
        if (age && understood && participate) {
            revalidatePath("/")
            redirect("/register")
            return {message: "Thank you for consenting! Let's get started!!!"}
        } else {
            let message = ""
            if (!age)
                message = `You must check if you're 18 years or older <br/>`
            if (!understood)
                message = message + `You must check if you understood the information <br/>`
            if (!participate)
                message = message + `You must check if you're participating <br/>`

            return { message: message }
        }
    }
    else {
        redirect("/declinedSurvey")
        return {message: "Thank you for your interest. Have a good day!"}
    }
}