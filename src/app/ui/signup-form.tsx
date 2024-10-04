'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button, Flex, Heading, Input } from '@/once-ui/components'
import { signup } from '@/app/actions/auth'


export function SignUpForm() {
    const [state, action] = useFormState(signup, undefined)

    return (
        <form action={action} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="user@example.com"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            <SubmitButton />
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button disabled={ pending } type="submit">
            Register
        </button>
    )
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
}