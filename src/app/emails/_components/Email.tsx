import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import EmailBoby from './EmailBoby'
import EmailHeader from './EmailHeader'
import Options from './Options'
import { useRouter } from 'next/navigation'
import ProgressBar from './ProgressBar'
import { EmailInfo } from './EmailContainer'

interface EmailProps {
  total: number,
  emailsContent: string[],
  emailsInfo: EmailInfo[],
  emailIndex: number,
  requireFeedback: boolean,
  setEmailIndex: (index: number) => void,
  setEmailsInfo: (emails: EmailInfo[]) => void
  setEmailsContent: (emails: string[]) => void
}

let progress = 0

const Email = (props: EmailProps) => {
  const router = useRouter()
  const [dialogStatus, setDialogStatus] = useState(false)

  const changeEmail = () => {
    // const size = props.emailsInfo.length

    if(props.emailsInfo.length === 1) {
      router.push("/instructions")
    } else {
      const newEmailsContent = [...props.emailsContent]
      const newEmailsInfo = [...props.emailsInfo]

      newEmailsInfo.splice(props.emailIndex, 1)
      newEmailsContent.splice(props.emailIndex, 1)
      props.setEmailsInfo(newEmailsInfo)
      props.setEmailsContent(newEmailsContent)

      if (props.emailIndex > 0) {
        props.setEmailIndex(props.emailIndex - 1)
      }
      progress++
    }
  }

  const onOptionSelected = () => {
    if (props.requireFeedback) {
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
        />

        <EmailBoby
            emailContent={atob(props.emailsContent[props.emailIndex])}
        />

        <Options
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