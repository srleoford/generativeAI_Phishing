'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NewUser } from "@/app/lib/definitions";
import { createToken } from "@/app/lib/tokenizer"; // Tokenizer module
import { upsertUserToPinecone } from "../utils/pinecone"; // Import Pinecone functionality



export async function registerUser (
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const email = formData.get("email") as string;
    const user = NewUser.safeParse({ email });

    if (user.success) {
        const { email } = user.data;

        //Initialize Pinecone
        const pineconeClient = await initPinecone();

        //Check if the user already exists in the Pinecone index
        const pineconeIndex = pineconeClient.Index(process.env.PINECONE_INDEX || 'users');
        const existingUserQuery = await pineconeIndex.query({
            vector: Array.from({ length: 50 }, () => 0), //Dummy vector for now every user will have a random vector associated ->for this next sprint I want to organize them to have more order for metadata 
            topK: 1, 
            filter: { "email": email }, //Check for an exact email match
            namespace: "registered-users"
        });

        if (existingUserQuery.matches && existingUserQuery.matches.length > 0) {
            return { message: `User with email ${email} already exists.` };
        }

        //Create a token for the user
        const token = createToken(email);

        //Upsert the new user data into Pinecone
        await upsertUserToPinecone(email, token);

        //Revalidate path and redirect to the introduction page
        revalidatePath("/");
        redirect("/intro");

        //Return success message
        return { message: `Email is valid! Registered new user: ${ email } with token: ${ token }` };
    } else {
        // Handle invalid email

        return { message: `Did not register user: ${ user.error.errors[1] ? user.error.errors[1].message :
                user.error.errors[0].message}` };
    }

    return { message: "Nothing happened." };
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