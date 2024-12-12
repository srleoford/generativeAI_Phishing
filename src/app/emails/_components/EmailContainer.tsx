'use client'

import {Flex} from '@/once-ui/components'
import React, {useState} from 'react'
import Email from './Email'
import SideBar from './sidebar/SideBar'
import {EmailAnswer} from '../models/emailAnswer'

export interface EmailData {
    id: number,
    body: string,
    subject: string,
    date: string,
    from: string,
    emailType: string,
    feedbackMessage: string,
    interactions: EmailAnswer,
}

interface EmailContainerProps {
    emailsData: EmailData[],
    phase: string
}

/**
 * EmailContainer Component
 *
 * This component manages the email viewing interface, including the sidebar and email display panel.
 * It maintains the currently selected email and passes necessary props to child components.
 *
 * Props:
 * @param {EmailContainerProps} props - The component properties.
 * @property {EmailData[]} props.emailsData - List of emails to display.
 * @property {string} props.phase - Current phase of the email processing/training.
 *
 * State:
 * @state {number} emailIndex - Index of the currently selected email. Default: -1 (no email selected).
 * @state {EmailData[]} emailsData - Local state for email data, initialized from props.
 *
 * Description:
 * - The component uses two pieces of state: `emailIndex` to track the selected email and `emailsData` to manage the list of emails.
 * - It renders a `SideBar` component for selecting emails and an `Email` component for viewing the selected email.
 * - If no email is selected (emailIndex === -1), the `Email` component is not rendered.
 */
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
            {/* Sidebar component for email selection */}
            <SideBar
                emailsInfo={emailsData}
                emailIndex={emailIndex}
                setEmailIndex={setEmailIndex}
            />
            {/* Displays the selected email if an email is selected */}
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