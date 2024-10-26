'use client'

import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import Email from './Email'
import SideBar from './sidebar/SideBar'

export interface EmailData {
    body: string,
    subject: string,
    date: string,
    from: string,
    to: string,
    emailType: string
}

interface EmailContainerProps {
    emailsData: EmailData[],
    requireFeedback: boolean
}

const EmailContainer = (props: EmailContainerProps) => {
    const size = props.emailsData.length
    const [emailIndex, setEmailIndex] = useState(0)
    const [emailsData, setEmailsData] = useState(props.emailsData)

    return (
        <Flex
            fillWidth
            fillHeight
            direction='row'
            gap='xs'
            alignItems='start'
        >
          <SideBar
            emailsInfo={emailsData}
            emailIndex={emailIndex}
            setEmailIndex={setEmailIndex}
          />
    
          <Email
            total={size}
            emailsInfo={emailsData}
            emailIndex={emailIndex}
            requireFeedback={props.requireFeedback}
            setEmailIndex={setEmailIndex}
            setEmailsInfo={setEmailsData}
          />
        </Flex>
      )
}

export default EmailContainer