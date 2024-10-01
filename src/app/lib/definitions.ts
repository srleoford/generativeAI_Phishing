import { z } from 'zod';

const RegisterSchema = z.object({
    email: z.string(),
    status: z.enum(['engaged', 'disengaged'], {
        invalid_type_error: "Disengaged! You can no longer participate in the survey"
    })
});

const registration = RegisterSchema

export async function register (
    registerData: RegisterData,
)