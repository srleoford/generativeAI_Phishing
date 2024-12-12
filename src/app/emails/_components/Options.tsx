'use client'

import {Button, Chip, Dialog, DropdownOptions, Flex, Select} from '@/once-ui/components'
import React from 'react'
import {EmailData} from './EmailContainer'
import {ActionMeta, default as ReactSelect} from "react-select"
import {options} from "@/app/emails/emailsConfiguration";

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
    onSetActions: (actions: string[]) => void,
    suggestedActions: string[],
}

const Options = (props: OptionsProps) => {
    const isChoiceDisable = props.email.interactions.isCorrect !== undefined
    const isActionDisable = props.email.interactions.suggestedActions.length > 0 && isChoiceDisable
    const onSelectChange = (options: readonly { label: string; value: string }[], actionMeta: ActionMeta<{ label: string; value: string }>) => {
        const values: string[] = options.map(item => item.value)
        props.onSetActions(values)
    }
    const selectedActions = options.filter(
        option => props.suggestedActions.includes(option.value)
    )
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

                <ReactSelect
                    options={options}
                    menuPlacement='top'
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    isDisabled={isActionDisable}
                    onChange={onSelectChange}
                    value={selectedActions}
                    placeholder="Choose suggested action"
                />
            </Flex>
        </Flex>
    )
}

export default Options