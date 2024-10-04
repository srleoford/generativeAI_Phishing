/**
 * This file is used for the type definitions to be used for the application
 */
import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    token: z.string().optional()
})

export type UserState =
    | {
        errors?: {
            email?: string[],
            token?: string[]
        }
        message?: string
       }
    | undefined

export const NewUser = UserSchema.required({ email: true })