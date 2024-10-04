import { Flex, Text } from '@/once-ui/components'
import React from 'react'
import EmailItem from './EmailItem'

const SideBar = () => {
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
            height="1"
            solid="neutral-strong"/>

        <EmailItem/>
        <EmailItem/>
        <EmailItem/>       
        <EmailItem/>
        <EmailItem/>
        <EmailItem/>        
        <EmailItem/>

    </Flex>
  )
}

export default SideBar