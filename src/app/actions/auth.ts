import { UserSchema, UserState } from "@/app/lib/definitions";

export async function signup(state: UserState, formData: FormData) {
    const validatedFields = UserSchema.safeParse({
        email: formData.get("email")
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    // Create user and insert into the DB
    const { email } = validatedFields.data

}