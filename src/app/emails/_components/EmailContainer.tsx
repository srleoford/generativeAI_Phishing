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
    const [emailIndex, setEmailIndex] = useState(0)

    return (
        <Flex
            fillWidth
            fillHeight
            direction='row'
            gap='xs'
            alignItems='start'
        >
          <SideBar
            emailsInfo={props.emailsInfo}
            setEmailIndex={setEmailIndex}
          />
    
          <Email
            emailsContent={props.emailsContent.emails}
            emailsInfo={props.emailsInfo.emails}
            emailIndex={emailIndex}
            requireFeedback={props.requireFeedback}
            setEmailIndex={setEmailIndex}
          />
        </Flex>
      )
}

export default EmailContainer