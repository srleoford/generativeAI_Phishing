import {DropdownOptions, Flex, Spinner} from '@/once-ui/components'
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
import {createSusceptibilityScoring} from "@/app/utils/susceptibilityScoring";
import {getNextJsCookies} from "@/app/actions/nextJsCookies";
import Loader from '../loading'
import {numberOfBlocksPhase2, numberOfEmailsPerBlock,numberOfPhase3Emails,numberOfTotalAttentionChecks} from  '../emailsConfiguration'

interface EmailProps {
    emailsInfo: EmailData[],
    emailIndex: number,
    phase: string,
    setEmailsInfo: Dispatch<SetStateAction<EmailData[]>>
}

let progress = 0

export default function Email(props: EmailProps) {
    const token = Cookies.get("userToken") || ""
    const router = useRouter()
    const [dialogStatus, setDialogStatus] = useState(false)
    const [feedbackMessage, setFeedbackMessage]: [FeedbackMessage, Dispatch<SetStateAction<FeedbackMessage>>] = useState({
        title: "Correct",
        body: "This is the feedback generated from AI model"
    })
    const [loadingBlock, setLoadingBlock] = useState(false)

    const completeEmail = () => {
        progress++
        //Checks if there are emails pending to be processed
        if (props.emailsInfo.length === progress && ((props.emailsInfo.length < (numberOfBlocksPhase2 * numberOfEmailsPerBlock)
            && (props.phase === "phase_2")) || (props.phase === "phase_3" && props.emailsInfo.length < numberOfPhase3Emails))) {
            const fetchEmails = async () => {
                //Disable pointer events while emails are being generated
                let body = document.getElementsByClassName("flex-row")[0];
                body.style.pointerEvents = 'none';
                
                setLoadingBlock(true)
                
                const scores = createSusceptibilityScoring(props.emailsInfo)
                const totalScore = Object.values(scores).reduce((sum, item) => sum + item.score, 0)
                const survey = await getNextJsCookies("survey")
                const surveyValue = survey?.value
                const openaiEmails = await fetch('http://localhost:3000/api/generateEmails',
                    {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                surveyValue,
                                difficulty: totalScore,
                                numberOfEmails: numberOfEmailsPerBlock
                            }
                        ),
                        cache: 'no-store'
                    }
                )
                let blockEmails: EmailData[] = await openaiEmails.json()
                
                //Assign attention check to current block
                if (props.phase === 'phase_2' && numberOfTotalAttentionChecks > 0) {
                    const numberOfProcessedAttentionChecks = props.emailsInfo.filter(email => email.emailType.toLowerCase() === 'attention_check').length

                    if (numberOfProcessedAttentionChecks < numberOfTotalAttentionChecks) {
                         // Select a random block from the blocks yet to process
                        const randomIndex = Math.floor(Math.random() * (numberOfBlocksPhase2 - ((props.emailsInfo.length - numberOfProcessedAttentionChecks)/numberOfEmailsPerBlock)));
    
                        // Check if the randomly selected block is the first block
                        let isFirstSelected = randomIndex === 0;
                        isFirstSelected = true
                        if (isFirstSelected) {
                            //Get random attention check and add it to block of emails
                            const attentionCheckData = await fetch('http://localhost:3000/api/dataset', {method:'POST',cache: 'no-store'})
                            let attentionCheckContent: EmailData[]
                            attentionCheckContent = await attentionCheckData.json()
                            blockEmails = blockEmails.concat(attentionCheckContent)
                        }
                    }
                }
                
                const newEmailsData = props.emailsInfo.concat(blockEmails)
                props.setEmailsInfo(newEmailsData)
            }
            fetchEmails().then(() =>  {
                    setLoadingBlock(false)
                    //Enable back pointer events after emails have loaded
                    let body = document.getElementsByClassName("flex-row")[0];
                    body.style.pointerEvents = 'all';
                }
            )
        } else if (props.emailsInfo.length === progress) {
            setCompletedCookie()
            sendEmailAnswers(
                token,
                props.phase,
                props.emailsInfo
            )
            if (props.phase === 'phase_1' || props.phase === 'phase_2'){
                router.push("/instructions")
            }
        }
    }

    const setResultAnswer = (
        emailType: string,
        answerType: string
    ) => {
        const response = emailType === answerType;
        if (emailType.toLowerCase() === 'attention_check') {
            setFeedbackMessage(
                {
                    title: 'Correct',
                    body: 'Thank you for paying attention!'
                }
            )
        }
        else {
            setFeedbackMessage(
                {
                    title: response ? "Correct" : "Incorrect",
                    body: props.emailsInfo[props.emailIndex].feedbackMessage
                }
            )
        }

        setResponse(response, answerType, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
    }

    const setSuggestAction = (suggestedActions: string[]) => {
        setSuggestedAction(suggestedActions, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])
        if (props.emailsInfo[props.emailIndex].interactions.choice != '' && props.emailsInfo[props.emailIndex].isSuggestedActionsClosed) {
            processEmail()
        }
    }

    const onOptionSelected = (type: string) => {
        setResultAnswer(
            props.emailsInfo[props.emailIndex].emailType, type
        )
        if (props.emailsInfo[props.emailIndex].interactions.suggestedActions.length > 0) {
            processEmail()
        }
    }

    const processEmail = () => {
        handleAttentionChecks()
        const timeElapsed = new Date().getTime() - props.emailsInfo[props.emailIndex].startedTime + props.emailsInfo[props.emailIndex].savedTime
        let timeInSeconds = timeElapsed / 1000
        setTimeSpent(timeInSeconds, props.emailIndex, [props.emailsInfo, props.setEmailsInfo])

        if (props.phase === "phase_2") {
            setDialogStatus(!dialogStatus)
        } else {
            completeEmail()
        }
    }

    const findActionInActions = (attentionCheck: string) => {
        return props.emailsInfo[props.emailIndex].interactions.suggestedActions.some(
            item => attentionCheck.includes(item)
        )
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
                || !findActionInActions(attentionCheckAction)) {

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

            {
                loadingBlock &&
                <>
                  <div style={{color:'white',zIndex:'1001',height:'0px'}}><Loader/></div>  
                <div className='overlay'>
                </div>
                <style jsx>{`
                    .overlay {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      filter: blur(2px);
                      background: rgba(0, 0, 0, 0.8);
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      z-index: 1000;
                      pointer-events: none; /* Prevent clicks in the overlay */
                    }
                  `}</style>
                  </>
            }

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
                emailIndex={props.emailIndex}
                emailsState={[props.emailsInfo, props.setEmailsInfo]}
                feedbackMessage={feedbackMessage}
                onClose={onCloseDialog}
                isDialogOpen={dialogStatus}
                onPhishOption={onOptionSelected}
                onRealOption={onOptionSelected}
                onSetActions={setSuggestAction}
                suggestedActions={props.emailsInfo[props.emailIndex].interactions.suggestedActions}
            />
            <ProgressBar index={progress} total={props.emailsInfo.length}/>
        </Flex>
    )
}