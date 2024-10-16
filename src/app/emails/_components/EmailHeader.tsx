import { Avatar, Flex, Text } from '@/once-ui/components'
import React from 'react'
import { EmailInfo } from './Email'

interface EmailHeaderinfo {
    info: EmailInfo
}

const EmailHeader = ({info}: EmailHeaderinfo) => {
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
                    <Text 
                        variant = "body-strong-s" onBackground='neutral-strong'>
                        {info.from}
                    </Text>
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
