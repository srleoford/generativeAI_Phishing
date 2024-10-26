import { Avatar, Flex, Text, ToggleButton } from '@/once-ui/components'
import React from 'react'
import { EmailData } from './EmailContainer'

interface EmailHeaderinfo {
    info: EmailData
    senderClicked: boolean,
    sender: string,
    onSenderClick: () => void
}

const EmailHeader = ({info, senderClicked, sender, onSenderClick}: EmailHeaderinfo) => {
  return (
    <Flex
        fillWidth
        direction='column'
        gap='16'
        as='header'
    >
        <Text
            paddingLeft='m'
            variant = "heading-default-m" 
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
                        variant = "body-default-s">
                        {info.date}
                    </Text>
                </Flex>
                <Text 
                    variant = "body-default-s" >
                    {"To:" + info.to}
                </Text>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default EmailHeader
