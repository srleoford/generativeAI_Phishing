import {DropdownOptions, Flex} from '@/once-ui/components'
import React, {Dispatch, SetStateAction, useState} from 'react'
import EmailBody from './EmailBody'
import EmailHeader from './EmailHeader'
import Options, {FeedbackMessage} from './Options'
import {useRouter} from 'next/navigation'
import ProgressBar from './ProgressBar'
// @ts-ignore
import Cookies from "js-cookie"
import {setCompletedCookie} from '@/app/utils/cookies'
import {EmailData} from './EmailContainer'
import {
    sendEmailAnswers,
    setClickingBehavior,
    setHoverOverLink,
    setResponse,
    setSenderInteraction,
    setSuggestedAction,
    setTimeSpent
} from '../models/emailAnswer'

interface EmailProps {
    emailsInfo: EmailData[],
    emailIndex: number,
    phase: string,
    setEmailsInfo: Dispatch<SetStateAction<EmailData[]>>
}

let progress = 0
let startTime = new Date().getTime()
let timeElapse = 0

export default function Email(props: EmailProps) {
    const token = Cookies.get("userToken") || ""
    const router = useRouter()
    const [dialogStatus, setDialogStatus] = useState(false)
    const [suggestedAction, setSelectSuggestion] = useState("")
    const [feedbackMessage, setFeedbackMessage]: [FeedbackMessage, Dispatch<SetStateAction<FeedbackMessage>>] = useState({
        title: "Correct",
        body: "This is the feedback generated from AI model"
    })

    const completeEmail = () => {
        progress++
        if (props.emailsInfo.length === progress) {
            setCompletedCookie()
            sendEmailAnswers(
                token,
                props.phase,
                props.emailsInfo
            )
            router.push("/instructions")
        } else {
            startTime = new Date().getTime()
        }
    }

    const setResultAnswer = (
        emailType: string,
        answerType: string
    ) => {
        const response = emailType === answerType;
        setFeedbackMessage(
            {
                title: response ? "Correct" : "Incorrect",
                body: props.emailsInfo[props.emailIndex].feedbackMessage
            }
        )
        setResponse(response, answerType, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
    }

    const setSuggestAction = (
        answerOption: DropdownOptions
    ) => {
        setSelectSuggestion(answerOption.label)
        setSuggestedAction(answerOption.value, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
        if (props.emailsInfo[props.emailIndex].interactions.choice != '') {
            processEmail()
        }
    }

    const onOptionSelected = (type: string) => {
        setResultAnswer(
            props.emailsInfo[props.emailIndex].emailType, type
        )
        if (props.emailsInfo[props.emailIndex].interactions.suggestedAction !== '') {
            processEmail()
        }
    }

    const processEmail = () => {
        handleAttentionChecks()
        timeElapse = new Date().getTime() - startTime
        let timeInSeconds = timeElapse / 1000
        setTimeSpent(timeInSeconds, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])

        if (props.phase === "phase_2") {
            setDialogStatus(!dialogStatus)
        } else {
            completeEmail()
        }
    }

    const handleAttentionChecks = () => {
        if (props.emailsInfo[props.emailIndex].emailType.toLowerCase() == 'attention_check') {
            var regex = /<b>(\w+)\s+email/;
            console.log(props.emailsInfo[props.emailIndex].body)
            var match = props.emailsInfo[props.emailIndex].body.match(regex);
            const attentionCheckType = match[1].toLowerCase()
            regex = /<b>"(\w+)\b.*?"\s<\/b>option/;
            match = props.emailsInfo[props.emailIndex].body.match(regex);
            const attentionCheckAction = match[1].toLowerCase()

            if (attentionCheckType != props.emailsInfo[props.emailIndex].interactions.choice.toLowerCase()
                || !props.emailsInfo[props.emailIndex].interactions.suggestedAction.toLowerCase().includes(attentionCheckAction)) {

                setTimeout(() => {
                    router.push("/");
                }, 0);
            }
        }
    }

    const onCloseDialog = () => {
        setDialogStatus(!dialogStatus)
        completeEmail()
    }

    return (
        <Flex
            fillHeight
            position="relative"
            border="brand-strong"
            borderStyle="solid-1"
            gap="16"
            padding="m"
            radius="xl"
            // onSolid="brand-strong"
            // solid="neutral-weak"
            direction='column'
            style={{
                background: "white",
                width: "80%"
            }}
        >
            <EmailHeader
                info={props.emailsInfo[props.emailIndex]}
                onSenderClick={() => {
                    setSenderInteraction(props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
                }}
            />

            <EmailBody
                emailContent={props.emailsInfo[props.emailIndex].body}
                onLinkClicked={() => {
                    setClickingBehavior(props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
                }}
                onHoverOverLink={() => {
                    setHoverOverLink(props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
                }}
            />

            <Options
                email={props.emailsInfo[props.emailIndex]}
                feedbackMessage={feedbackMessage}
                onClose={onCloseDialog}
                isDialogOpen={dialogStatus}
                onPhishOption={onOptionSelected}
                onRealOption={onOptionSelected}
                onSetAction={setSuggestAction}
                feedbackSuggestion={suggestedAction}
            />
            <ProgressBar index={progress} total={props.emailsInfo.length}/>
        </Flex>
    )
}