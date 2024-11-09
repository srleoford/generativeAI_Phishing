'use client'

import {Avatar, Flex, Text, ToggleButton} from '@/once-ui/components'
import {ColorScheme, ColorWeight} from '@/once-ui/types'
import React from 'react'
import styles from './SideBar.module.css'
import {EmailData} from '../EmailContainer'

interface EmailItemProps {
    emailInfo: EmailData,
    isSelected: boolean,
    onSelected: () => void
}

interface Background {
    onBackground?: `${ColorScheme}-${ColorWeight}`,
    background?: `${ColorScheme}-${ColorWeight}`
}

const EmailItem = (props: EmailItemProps) => {
    let background: Background = {
        onBackground: undefined,
        background: undefined
    }
    if (props.emailInfo.interactions.isCorrect !== undefined) {
        background = {
            onBackground: "success-strong",
            background: "success-medium"
        }
    }
    return (
        <ToggleButton
            onClick={
                props.onSelected
            }
            selected={props.isSelected}
            truncate={true}
            className={styles.singleLineText}
            size="l"
            align="start"
            //width='fill'
            style={{
                padding: "0px",
                borderRadius: "8px",
                width: "100%",
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
                onBackground={background.onBackground}
                background={background.background}
                style={{
                    width: "100%"
                }}
            >
                <Avatar
                    size="m"
                    src="/images/profile.png"
                />
                <Flex
                    direction='column'
                    gap='4'
                    fillWidth
                    style={{width: "100%"}}
                >
                    <Text
                        className={styles.singleLineText}
                        variant="body-strong-xs"
                        onBackground='neutral-strong'
                        style={{width: "100%"}}
                    >
                        {props.emailInfo.subject}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>

                    <Text
                        className={styles.singleLineText}
                        variant="body-default-xs"
                        onBackground='neutral-weak'
                    >
                        {props.emailInfo.from}
                    </Text>
                </Flex>
            </Flex>
        </ToggleButton>
    )
}

export default EmailItem

