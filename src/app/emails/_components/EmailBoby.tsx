import { Flex, Text } from '@/once-ui/components'
import React from 'react'

interface EmailBobyProps {
    emailContent: string
}

const EmailBoby = (props: EmailBobyProps) => {
  return (
    <Flex
        fillWidth
        fillHeight
        overflowY="scroll"
        direction="column"
        //justifyContent="start"
        // as="body"
    >        
        <div dangerouslySetInnerHTML={{ __html: props.emailContent }} />
    </Flex>
  )
}

export default EmailBoby