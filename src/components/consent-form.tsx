import { useFormState } from "react-dom";
import { consent } from '@/app/lib/data'
import { userConsent } from "@/app/actions/actions";
import { DefaultButton } from "@/app/ui/button"
import { Flex } from '@/once-ui/components'
// import SignatureCaptureComponent from "@/components/signature";

const initialState = {
    message: ''
}

function AcceptButton () {

    return (
        <DefaultButton
            href={""}
            label={"Accept"}
            type="submit"
            name={"accept"}
            value="true"/>
    )
}

function DeclineButton () {

    return (
        <DefaultButton
            href={""}
            label={"Decline"}
            type="submit"
            name={"accept"}
            value="false"/>
    )
}


/** *
 * This handles the consent and formAction on the server side to try and avoid any corruption of the data or consent
 * Just use three simple checkboxes for consent.
 * @constructor
 */
export function ConsentForm () {
    const [state, formAction] = useFormState(userConsent, initialState)

    return (
        <>
            {consent.map((item) => (
                <div key={item.id}>
                    {<h2>{item.title}</h2>}
                    <br/>
                    <p dangerouslySetInnerHTML={{ __html: item.section }} style={{ color: item.color }}/>
                    <br/>
                    <hr/>
                </div>
            ))}

            <h2>Answer the following:</h2>
            <br/>
            <form action={formAction}>
                <input type="checkbox" name="age" />
                <label htmlFor="age">I am age 18 or older</label>
                <br/>

                <input type="checkbox" name="understood" />
                <label htmlFor="understood">I have read and understand the information above</label>
                <br/>

                <input type="checkbox" name="participate" />
                <label htmlFor="participate">I want to participate in this research and continue with the study</label>
                <br/> <br/>

                <Flex
                    position="relative"
                    flex={1} gap="24" marginBottom="104"
                    direction="column">
                    {/*<SignatureCaptureComponent />*/}
                    <Flex
                        position="relative"
                        flex={1} gap="24" marginBottom="12"
                        direction="row">
                        <AcceptButton/>
                        <DeclineButton/>

                    </Flex>
                    <Flex
                        position="relative"
                        flex={4} gap="24" marginBottom="104"
                        direction="row">
                        <p dangerouslySetInnerHTML={{__html: state?.message}} style={{color: "red"}} aria-live="assertive"
                           className="sr-only" role="status"/>
                    </Flex>
                </Flex>
            </form>
        </>
    )
}