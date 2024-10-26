'use client'

import { Button, Dialog, Flex } from '@/once-ui/components'
import React from 'react'

export interface FeedbackMessage {
  title: string,
  body: string
}

export interface OptionsProps {
  feedbackMessage: FeedbackMessage,
  onClose: () => void,
  isDialogOpen: boolean,
  onPhishOption: (type: string) => void,
  onRealOption: (type: string) => void
}

const Options = (props: OptionsProps) => {
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
              label: 'Confirm',
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

        <Button
            onClick={
              () => {props.onPhishOption("Phishing")}
            }
            variant="primary"
            size="l"
            label="Phish"
            />
        <Button
            onClick={
              () => {props.onRealOption("")}
            }
            variant="primary"
            size="l"
            label="Real"
            />
    </Flex>
  )
}

export default Options