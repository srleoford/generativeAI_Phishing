import { useFormState } from "react-dom";
import { registerUser } from '@/app/actions/actions'
import { DefaultButton } from "@/app/ui/button";
import { Input } from "@/once-ui/components"


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
                <p dangerouslySetInnerHTML={{__html: state?.message}} style={{color: "red"}} aria-live="assertive"
                   className="sr-only" role="status"/>
            </form>
        </>
    )
}