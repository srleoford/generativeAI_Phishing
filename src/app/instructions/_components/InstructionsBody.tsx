'use client'

import {Button, Flex, Text} from '@/once-ui/components'
import React from 'react'

interface InstructionsBodyProps {
    title: string,
    description: string
}

const InstructionsBody = (props: InstructionsBodyProps) => {
    return (
        <Flex
            fillWidth
            position="relative"
            alignItems='center'
            border="brand-strong"
            borderStyle="solid-1"
            gap="16"
            padding="xl"
            radius="xl"
            // onSolid="brand-strong"
            // solid="neutral-weak"
            direction='column'
            style={{background: "white"}}
        >
            <Text
                variant='body-strong-xl'>
                {props.title}
            </Text>
            <Text
                variant='body-strong-xl'>
                {props.description}
            </Text>

            <a
                href="/emails"
            >
                {
                    props.description !== "" &&
                    <Button
                        variant="primary"
                        size="l"
                        label="Accept">
                    </Button>
                }
            </a>
        </Flex>
    )
}

export default InstructionsBody