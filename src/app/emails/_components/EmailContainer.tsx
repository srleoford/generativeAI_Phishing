'use client'

import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import Email from './Email'
import SideBar from './sidebar/SideBar'

export interface EmailInfo {
    subject: string,
    date: string,
    from: string,
    to: string
}

export interface EmailsContent {
    emails: string[]
}

export interface EmailsInfo {
    emails: EmailInfo[]
}

interface EmailContainerProps {
    emailsContent: EmailsContent,
    emailsInfo: EmailsInfo,
    requireFeedback: boolean
}

const EmailContainer = (props: EmailContainerProps) => {
    const size = props.emailsInfo.emails.length
    const [emailIndex, setEmailIndex] = useState(0)
    const [emailsInfo, setEmailsInfo] = useState(props.emailsInfo.emails)
    const [emailsContent, setEmailsContent] = useState(props.emailsContent.emails)

    return (
        <Flex
            fillWidth
            fillHeight
            direction='row'
            gap='xs'
            alignItems='start'
        >
          <SideBar
            emailsInfo={emailsInfo}
            emailIndex={emailIndex}
            setEmailIndex={setEmailIndex}
          />
    
          <Email
            total={size}
            emailsContent={emailsContent}
            emailsInfo={emailsInfo}
            emailIndex={emailIndex}
            requireFeedback={props.requireFeedback}
            setEmailIndex={setEmailIndex}
            setEmailsInfo={setEmailsInfo}
            setEmailsContent={setEmailsContent}
          />
        </Flex>
      )
}

export default EmailContainer