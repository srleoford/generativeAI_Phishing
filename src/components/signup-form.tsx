'use client'

import { DefaultButton } from "@/app/ui/button";
import { register } from '@/app/actions/actions'

export default function SignupForm({ register }: { register: any }) {
    <form action={register}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="user@example.com"/>
        <DefaultButton label={"Register"} type={"submit"} />
    </form>
}