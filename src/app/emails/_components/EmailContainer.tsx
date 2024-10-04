'use client'

import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import EmailBoby from './EmailBoby'
import EmailHeader from './EmailHeader'
import Options from './Options'
import emailsContent from '../mocks/emailsContent.json'
import emailsInfo from '../mocks/emailsInfo.json'

export interface EmailInfo {
  subject: string,
  date: string,
  from: string,
  to: string,
  cc?: string,
  bcc?: string
}

let emailIndex = 0

const EmailContainer = () => {

  // const [emailIndex, setEmailIndex] = useState(0)
  let base64String = emailsContent.emails[emailIndex]
  let decodedString = atob(base64String)

  const [emailContent, setEmailContent] = useState(decodedString)
  const [emailInfo, setEmailInfo] = useState(emailsInfo.emails[emailIndex])
  const [dialogStatus, setDialogStatus] = useState(false)

  const onOptionSelected = () => {
    setDialogStatus(!dialogStatus)
  }
  const onCloseDialog = () => {
    setDialogStatus(!dialogStatus)
    if(emailIndex < 5) {
      emailIndex++
    } else {
      emailIndex = 0
    }
    setEmailInfo(emailsInfo.emails[emailIndex])
    base64String = emailsContent.emails[emailIndex]
    decodedString = atob(base64String)
    setEmailContent(decodedString)
  }

  return (
    <Flex
        fillWidth
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
        style={{background: "white"}}
    >
        <EmailHeader
            info={emailInfo}
        />

        <EmailBoby
            emailContent={emailContent}
        />

        <Options
          onClose={onCloseDialog}
          isDialogOpen={dialogStatus} 
          onPhishOption={onOptionSelected}
          onRealOption={onOptionSelected}
        />
    </Flex>
  )
}

export default EmailContainer