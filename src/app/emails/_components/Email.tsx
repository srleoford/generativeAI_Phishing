import { Flex } from '@/once-ui/components'
import React, { Dispatch, SetStateAction, useState } from 'react'
import EmailBoby from './EmailBoby'
import EmailHeader from './EmailHeader'
import Options, { FeedbackMessage } from './Options'
import { useRouter } from 'next/navigation'
import ProgressBar from './ProgressBar'
import { cookies } from '../../../../node_modules/next/headers';
import { setCompletedCookie } from '@/app/utils/cookies'
import { EmailData } from './EmailContainer'
import { resetAnswers, sendEmailAnswers, setClickingBehavior, setEmail, setHoverOverLink, setResponse, setSenderInteraction, setTimeSpent } from '../models/emailAnswer'

interface EmailProps {
  total: number,
  emailsInfo: EmailData[],
  emailIndex: number,
  requireFeedback: boolean,
  setEmailIndex: (index: number) => void,
  setEmailsInfo: (emails: EmailData[]) => void
}

const changeFeedbackMessage = (
  emailType: string,
  answerType: string,
  setFeedbackMessage: (feedbackMessage: FeedbackMessage) => void,
  setResult: (isCorrect: boolean) => void
) => {
  if(emailType===answerType) {
    setFeedbackMessage(
      {
        title: "Correct",
        body: "This answer was correct because...."
      }
    )
    setResult(true)
  } else {
    setFeedbackMessage(
      {
        title: "Incorrect",
        body: "This answer was incorrect because...."
      }
    )
    setResult(false)
  }
}

let progress = 0
let startTime = new Date().getTime()
let timeElapse = 0

const Email = (props: EmailProps) => {
  const router = useRouter()
  const [dialogStatus, setDialogStatus] = useState(false)
  const [senderClicked, setSenderClicked] = useState(true)
  const [sender, setSender] = useState("Click to view sender")
  const [feedbackMessage, setFeedbackMessage]: [FeedbackMessage, Dispatch<SetStateAction<FeedbackMessage>>] = useState({
    title: "Correct",
    body: "This is the feedback generated from AI model"
  })

  const changeEmail = () => {
    resetAnswers()
    if(props.emailsInfo.length === 1) {
      setCompletedCookie()
      sendEmailAnswers()
      router.push("/instructions")
    } else {
      const newEmailsInfo = [...props.emailsInfo]

      newEmailsInfo.splice(props.emailIndex, 1)
      props.setEmailsInfo(newEmailsInfo)

      if (props.emailIndex > 0) {
        props.setEmailIndex(props.emailIndex - 1)
      }
      progress++
      startTime = new Date().getTime()
      setSenderClicked(true)
      setSender("Click to view sender")
    }
  }

  const onOptionSelected = (type: string) => {
    timeElapse = new Date().getTime() - startTime
    setTimeSpent(timeElapse)
    setEmail(props.emailsInfo[props.emailIndex])
    if (props.requireFeedback) {
      changeFeedbackMessage(
        props.emailsInfo[props.emailIndex].emailType, 
        type, setFeedbackMessage,
        (isCorrect: boolean) => {setResponse(isCorrect)}
      )
      setDialogStatus(!dialogStatus)
    } else {
      changeEmail()
    }
  }
  const onCloseDialog = () => {
    setDialogStatus(!dialogStatus)
    changeEmail()
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
            senderClicked={senderClicked}
            sender={sender}
            onSenderClick={() => {
              setSender("from: " + props.emailsInfo[props.emailIndex].from)
              setSenderClicked(false)
              setSenderInteraction()
            }}
        />

        <EmailBoby
          emailContent={props.emailsInfo[props.emailIndex].body}
          onLinkClicked={() => {
            setClickingBehavior()
          }}
          onHoverOverLink={() => {
            setHoverOverLink()
          }}
        />

        <Options
          feedbackMessage={feedbackMessage}
          onClose={onCloseDialog}
          isDialogOpen={dialogStatus} 
          onPhishOption={onOptionSelected}
          onRealOption={onOptionSelected}
        />
        <ProgressBar index={progress} total={props.total} />
    </Flex>
  )
}

export default Email