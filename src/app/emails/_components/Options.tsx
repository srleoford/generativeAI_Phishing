'use client'

import {Button, Chip, Dialog, Flex} from '@/once-ui/components'
import React, {Dispatch, SetStateAction, SyntheticEvent} from 'react'
import {EmailData} from './EmailContainer'
import {options} from "@/app/emails/emailsConfiguration";
import {Autocomplete, TextField} from "@mui/material";

export interface FeedbackMessage {
    title: string,
    body: string
}

export interface OptionsProps {
    emailIndex: number,
    emailsState: [EmailData[], Dispatch<SetStateAction<EmailData[]>>],
    feedbackMessage: FeedbackMessage,
    onClose: () => void,
    isDialogOpen: boolean,
    onPhishOption: (type: string) => void,
    onRealOption: (type: string) => void,
    onSetActions: (actions: string[]) => void,
    suggestedActions: string[],
}

const Options = (props: OptionsProps) => {
    const email: EmailData = props.emailsState[0][props.emailIndex]
    const isChoiceDisable = email.interactions.isCorrect !== undefined
    const isActionDisable = email.interactions.suggestedActions.length > 0 && isChoiceDisable && email.isSuggestedActionsClosed
    const onSelectChange = (event: SyntheticEvent<Element, Event>, value: { label: string; value: string }[]) => {
        const values: string[] = value.map(item => item.value)
        props.onSetActions(values)
    }
    const selectedActions = options.filter(
        option => props.suggestedActions.includes(option.value)
    )
    const onMenuClosedState = (isClosed: boolean)=> {
        const newEmailsData = [...props.emailsState[0]]
        newEmailsData[props.emailIndex].isSuggestedActionsClosed = isClosed
        props.emailsState[1](newEmailsData)
    }
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
                        email.interactions.choice !== "" &&
                        <Chip
                            label={email.interactions.choice}
                            selected
                            onClick={()=>{}}
                        />
                    }

                </Flex>

                <Autocomplete
                    multiple
                    disabled={isActionDisable}
                    disableCloseOnSelect
                    id="tags-outlined"
                    options={options}
                    onChange={onSelectChange}
                    value={selectedActions}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField {...params} label="Choose suggested action" />
                    )}
                    onClose={() => {
                        onMenuClosedState(true)
                        props.onSetActions(props.suggestedActions)
                    }}
                    onOpen={() => {
                        onMenuClosedState(false)
                    }}
                    sx={{ width: '500px' }}
                />
            </Flex>
        </Flex>
    )
}

export default Options