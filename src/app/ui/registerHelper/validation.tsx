/**
 * This file is used for validation functions and such
 */
export function validateEmail(
    email: string) {
    if (!email) {
        return "Invalid email! Please enter a valid email address";
    }
    return "Validation Complete!"
    // else {
    //     if (email)
    // }
}