import {Avatar, Flex, Text, ToggleButton} from '@/once-ui/components'
import React from 'react'
import {EmailData} from './EmailContainer'
// @ts-ignore
import Cookies from "js-cookie"

interface EmailHeaderProps {
    info: EmailData,
    onSenderClick: () => void
}

export const emailHide = "Click to view sender"

const EmailHeader = ({info, onSenderClick}: EmailHeaderProps) => {
    const email = Cookies.get("email")
    const senderClicked = !info.interactions.senderInteraction
    let sender = emailHide
    if (info.interactions.senderInteraction) {
        sender = info.from
    }
    return (
        <Flex
            fillWidth
            direction='column'
            gap='16'
            as='header'
        >
            <Text
                paddingLeft='m'
                variant="heading-default-m"
                onBackground="brand-strong">
                {info.subject}
            </Text>

            <Flex
                fillWidth
                height="1"
                solid="neutral-strong"/>

            <Flex
                gap="24"
                direction='row'>
                <Avatar
                    size="m"
                    src="/images/profile.png"
                />
                <Flex
                    fillWidth
                    direction="column"
                    onBackground='neutral-weak'>
                    <Flex
                        fillWidth
                        justifyContent="space-between">
                        <ToggleButton
                            onClick={onSenderClick}
                            selected={senderClicked}
                            size="s"
                            label={sender}
                            align="center"
                        />
                        <Text
                            variant="body-default-s">
                            {info.date}
                        </Text>
                    </Flex>
                    <Text
                        suppressHydrationWarning
                        variant="body-default-s">
                        {"To: " + email}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EmailHeader
