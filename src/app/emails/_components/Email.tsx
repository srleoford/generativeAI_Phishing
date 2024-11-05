import {DropdownOptions, Flex} from '@/once-ui/components'
import React, { Dispatch, SetStateAction, useState } from 'react'
import EmailBody from './EmailBody'
import EmailHeader from './EmailHeader'
import Options, { FeedbackMessage } from './Options'
import { useRouter } from 'next/navigation'
import ProgressBar from './ProgressBar'
import { cookies } from '../../../../node_modules/next/headers';
import Cookies from "js-cookie"
import { setCompletedCookie } from '@/app/utils/cookies'
import { EmailData } from './EmailContainer'
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
    const token  = Cookies.get("userToken") || ""
    const router = useRouter()
    const [dialogStatus, setDialogStatus] = useState(false)
    const [suggestedAction, setSelectSuggestion] = useState("")
    const [feedbackMessage, setFeedbackMessage]: [FeedbackMessage, Dispatch<SetStateAction<FeedbackMessage>>] = useState({
        title: "Correct",
        body: "This is the feedback generated from AI model"
    })

    const completeEmail = () => {
        progress++
        if(props.emailsInfo.length === progress) {
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
        if(emailType===answerType) {
            setFeedbackMessage(
                {
                    title: "Correct",
                    body: "This answer was correct because...."
                }
            )
            setResponse(true, answerType, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
        } else {
            setFeedbackMessage(
                {
                    title: "Incorrect",
                    body: "This answer was incorrect because...."
                }
            )
            setResponse(false, answerType, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
        }
    }

    const setSuggestAction = (
        answerOption: DropdownOptions
    ) => {
        setSelectSuggestion(answerOption.label)
        setSuggestedAction(answerOption.value, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
    }

    const onOptionSelected = (type: string) => {
        // Capturing the time spent in seconds
        timeElapse = new Date().getTime() - startTime
        let timeInSeconds = timeElapse / 1000
        setTimeSpent(timeInSeconds, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
        setResultAnswer(
            props.emailsInfo[props.emailIndex].emailType, type
        )
        if (props.phase === "phase_2") {
            setDialogStatus(!dialogStatus)
        } else {
            completeEmail()
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
            <ProgressBar index={progress} total={props.emailsInfo.length} />
        </Flex>
    )
}