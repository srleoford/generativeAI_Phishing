import { Accordion, Flex, Text } from '@/once-ui/components'
import React, { useState } from 'react'
import EmailItem from './EmailItem'
import { EmailData } from '../EmailContainer'

interface SideBarProps {
    emailsInfo: EmailData[],
    emailIndex: number,
    setEmailIndex: (index: number) => void
}

const SideBar = (props: SideBarProps) => {
    const [isReadOpen, setIsReadOpen] = useState(false)
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

        <Accordion
            title="Unread - Unsolved"
            open
        >
            {
                props.emailsInfo.map((element, index) => {
                    if(element.interactions.isCorrect === undefined) {
                        return (
                            <EmailItem
                                key={index}
                                emailInfo={element}
                                isSelected={index===props.emailIndex}
                                onSelected={
                                    () => {
                                        props.setEmailIndex(index)
                                    }
                                }
                            />
                        )
                    }
                })
            }
        </Accordion>
        <Accordion
            title="Read - Solved"
            open={isReadOpen}
        >
            {
                props.emailsInfo.map((element, index) => {
                    if(element.interactions.isCorrect !== undefined) {
                        if(!isReadOpen) {
                            setIsReadOpen(true)
                        }
                        return (
                            <EmailItem
                                key={index}
                                emailInfo={element}
                                isSelected={index===props.emailIndex}
                                onSelected={
                                    () => {
                                        props.setEmailIndex(index)
                                    }
                                }
                            />
                        )
                    }
                })
            }
        </Accordion>
    </Flex>
  )
}

export default SideBar