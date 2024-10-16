import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import EmailBoby from './EmailBoby'
import EmailHeader from './EmailHeader'
import Options from './Options'
import { useRouter } from 'next/navigation'
import ProgressBar from './ProgressBar'
import { EmailInfo, EmailsContent, EmailsInfo } from './EmailContainer'

interface EmailProps {
  emailsContent: string[],
  emailsInfo: EmailInfo[],
  emailIndex: number,
  requireFeedback: boolean,
  setEmailIndex: (index: number) => void
}

let progress = 0

const Email = ({emailsContent, emailsInfo, emailIndex, requireFeedback, setEmailIndex}: EmailProps) => {
  const router = useRouter()
  // const [emailIndex, setEmailIndex] = useState(0)
  let base64String = emailsContent[emailIndex]
  let decodedString = atob(base64String)

  const [emailContent, setEmailContent] = useState(decodedString)
  const [emailInfo, setEmailInfo] = useState(emailsInfo[emailIndex])
  const [dialogStatus, setDialogStatus] = useState(false)

  const counter = (size: number) => {
    if(emailIndex < size - 1) {
      setEmailIndex(emailIndex + 1)
      progress++
    } else {
      router.push("/instructions")
    }
  }

  const changeEmail = () => {
    counter(emailsContent.length)
    // setEmailInfo(emailsInfo[emailIndex])
    // base64String = emailsContent[emailIndex]
    // decodedString = atob(base64String)
    // setEmailContent(decodedString)
  }

  const onOptionSelected = () => {
    if (requireFeedback) {
      setDialogStatus(!dialogStatus)
    } else {
      changeEmail()
    }
  }
  const onCloseDialog = () => {
    setDialogStatus(!dialogStatus)
    changeEmail()
  }

  const valueTest = emailsInfo[emailIndex]
  const valueTest2 = atob(emailsContent[emailIndex])

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
            info={valueTest}
        />

        <EmailBoby
            emailContent={valueTest2}
        />

        <Options
          onClose={onCloseDialog}
          isDialogOpen={dialogStatus} 
          onPhishOption={onOptionSelected}
          onRealOption={onOptionSelected}
        />
        <ProgressBar index={progress} total={emailsContent.length} />
    </Flex>
  )
}

export default Email