'use client'

import {Button, Chip, Dialog, DropdownOptions, Flex, Select, Text} from '@/once-ui/components'
import React from 'react'
import {EmailData} from './EmailContainer'
import styles from '@/app/emails/_components/sidebar/SideBar.module.css'

export interface FeedbackMessage {
    title: string,
    body: string
}

export interface OptionsProps {
    email: EmailData,
    feedbackMessage: FeedbackMessage,
    onClose: () => void,
    isDialogOpen: boolean,
    onPhishOption: (type: string) => void,
    onRealOption: (type: string) => void,
    onSetAction: (action: DropdownOptions) => void,
    feedbackSuggestion: string,
}

const options = [
    { label: 'Respond to this email', value: 'respond' },
    { label: 'Click Link/Open attachment', value: 'click_open' },
    { label: 'Check sender', value: 'checkSender' },
    { label: 'Check link', value: 'checkLink' },
    { label: 'Delete email', value: 'delete' },
    { label: 'Report this email', value: 'report' },
];

const getLabelFromValue = (value) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : '';
};

const Options = (props: OptionsProps) => {
    const isChoiceDisable = props.email.interactions.isCorrect !== undefined
    const isActionDisable = props.email.interactions.suggestedAction !== ""
    return (
        <Flex
            direction='row'
            gap='m'>

            <Dialog
                onClose={props.onClose}
                isOpen={props.isDialogOpen}
                title={props.feedbackMessage.title}
                primaryButtonProps={{
                    disabled: false,
                    label: 'Ok',
                    loading: false,
                    onClick: props.onClose,
                    size: 'm',
                    variant: 'primary'
                }}
            >
                <p>
                    {props.feedbackMessage.body}
                </p>
            </Dialog>

            <Flex
                fillWidth
                justifyContent='space-between'
                direction='row'
                gap='16'
            >
                <Flex
                    direction='row'
                    alignItems='center'
                    gap='m'>
                    <Button
                        onClick={
                            () => {
                                props.onPhishOption("Phishing")
                            }
                        }
                        variant="primary"
                        size="l"
                        label="Phish"
                        disabled={isChoiceDisable}
                    />
                    <Button
                        onClick={
                            () => {
                                props.onRealOption("Ham")
                            }
                        }
                        variant="primary"
                        size="l"
                        label="Real"
                        disabled={isChoiceDisable}
                    />
                    {
                        props.email.interactions.choice !== "" &&
                        <Chip
                            label={props.email.interactions.choice}
                            selected
                            onClick={()=>{}}
                        />
                    }

                </Flex>

                <Select
                    id={"suggestAction"}
                    className={styles.suggestedAction}
                    label="Choose suggested action"
                    options={options}
                    value={getLabelFromValue(props.feedbackSuggestion)}
                    onSelect={props.onSetAction}
                    disabled={isActionDisable}
                />
            </Flex>
        </Flex>
    )
}

export default Options