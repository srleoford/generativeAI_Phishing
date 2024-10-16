import { Flex, Text } from '@/once-ui/components'
import React from 'react'
import EmailItem from './EmailItem'
import { EmailsInfo } from '../EmailContainer'

interface SideBarProps {
    emailsInfo: EmailsInfo,
    setEmailIndex: (index: number) => void
}

const SideBar = (props: SideBarProps) => {
  return (
    <Flex
        gap='4'
        fillHeight
        border="brand-strong"
        borderStyle="solid-1"
        padding="xs"
        radius="xl"
        direction='column'
        position='relative'
        style={{
            background: "white",
            width: "20%"
        }}
    >
        <Text
            variant = "heading-default-m" 
            onBackground="brand-strong"
        >
            Inbox
        </Text>

        <Flex 
            fillWidth
            direction='column'
            //height="1"
            solid="neutral-strong"/>

        {
            props.emailsInfo.emails.map((element, index) => {
                return (
                    <EmailItem
                        key={index}
                        emailInfo={element}
                        isSelected={false}
                        onSelected={
                            () => {
                                props.setEmailIndex(index)
                            }
                        }
                    />
                )
            })
        }
    </Flex>
  )
}

export default SideBar