"use client"
import { useFormState } from "react-dom";
import { registerUser } from '@/app/actions/actions'
import { DefaultButton } from "@/app/ui/button";
import { Input } from "@/once-ui/components"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const initialState = {
    message: '',
}

function RegisterButton () {

    return (
        <DefaultButton
            href={""}
            label={"Register"}
            type={"submit"}
            name={"register"}
            value={""}/>
    )
}

export function SignupForm () {
    const [state, formAction] = useFormState(registerUser, initialState)

    const messageContent = state?.message || "";
    const router = useRouter(); 
    useEffect(() => {
        if (messageContent) {
            Cookies.remove('userToken'); 
            Cookies.remove('surveySubmitted');
            const token = messageContent.split(" ").pop();
            Cookies.set('userToken', token); 
            router.push('/intro');
        }
      }, [messageContent, state?.isSuccess, router]);

    return (
        <>
            <form action={formAction}>
                <Input
                    id=""
                    name="email"
                    label="Email"
                    labelAsPlaceholder />
                <br/>
                <RegisterButton />
                {/* <p dangerouslySetInnerHTML={{__html: state?.message}} style={{color: "red"}} aria-live="assertive"
                   className="sr-only" role="status"/> */}
            </form>
        </>
        
    )
}