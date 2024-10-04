'use client'

import { Avatar, Button, Flex, Text, ToggleButton } from '@/once-ui/components'
import React from 'react'
import styles from './SideBar.module.css'

interface EmailItemProps {
    subject: string,
    from: string,
    isSelected: boolean
}

const EmailItem = () => {
  return (
    <ToggleButton
        //onClick={() => {}}
        // onClick={S}
        selected={false}
        truncate={true}
        className={styles.singleLineText}
        size="l"
        align="start"
        width='fit'
        style={{
            padding: "0px",
            borderRadius: "13px",
        }}
    >
        <Flex
            direction='row'
            gap='4'
            justifyContent='start'
            radius="m"
            borderStyle="solid-1"
            padding='8'
            fillWidth
            //style={{height:"10%"}}
            position='relative'
        >
            <Avatar
                size="m"
                src="/images/profile.png"
            />
            <Flex
                direction='column'
                gap='4'
            >
                <Text
                    className={styles.singleLineText}
                    variant = "body-strong-xs" 
                    onBackground='neutral-strong'
                >
                    🎉 Get Ready to Rock! Join Us for the UTEP Homecoming Pregame Party 🎉
                </Text>

                <Text
                    className={styles.singleLineText}
                    variant = "body-default-xs" 
                    onBackground='neutral-weak'
                >
                    UTEP Homecoming - minernation@reach.utep.edu
                </Text>
            </Flex>
        </Flex>
    </ToggleButton>
  )
}

export default EmailItem

