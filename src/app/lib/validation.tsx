/**
 * This file is used for validation functions and such
 */
import { NewUser } from "@/app/lib/definitions";

/**
 * If the email is valid, see if there's a duplicate in the DB. If not, create token and entry for the new user
 * Else, do not allow for participation
 * @param email
 */
export const validateEmail = (email: string)=> {
    const surveyor = NewUser.safeParse(email)

    if (surveyor.success) {
        console.log("Validation Complete!")
        return email
    }
    else {
        return "Invalid email! Please enter a valid email address";
    }
}