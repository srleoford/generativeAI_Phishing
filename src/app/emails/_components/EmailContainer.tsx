'use client'

import { Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import Email from './Email'
import SideBar from './sidebar/SideBar'
import { EmailAnswer } from '../models/emailAnswer'

export interface EmailData {
    id: number,
    body: string,
    subject: string,
    date: string,
    from: string,
    emailType: string,
    interactions : EmailAnswer,
}

interface EmailContainerProps {
    emailsData: EmailData[],
    phase: string
}

const EmailContainer = (props: EmailContainerProps) => {
    const [emailIndex, setEmailIndex] = useState(-1)
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
          {emailIndex > -1 && (
            <Email
              emailsInfo={emailsData}
              emailIndex={emailIndex}
              phase={props.phase}
              setEmailsInfo={setEmailsData}
            />
          )}

        </Flex>
      )
}

export default EmailContainer