/**
 * This file is used for the type definitions to be used for the application
 */
import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().email().superRefine((val, ctx) => {
        if (val == "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `No email address given. Please enter a valid email address: ${val}`
            })
        }
        else if (val == null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Invalid email! Please enter a valid email address: ${val}`
            })
        }
    }),
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