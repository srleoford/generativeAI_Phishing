'use client'

import { Button, Dialog, Flex } from '@/once-ui/components'
import React, { useState } from 'react'

interface OptionsProps {
  onClose: () => void,
  isDialogOpen: boolean,
  onPhishOption: () => void,
  onRealOption: () => void
}

const Options = ({onClose, isDialogOpen, onPhishOption, onRealOption}: OptionsProps) => {
  return (
    <Flex
        direction='row'
        gap='m'>

        <Dialog
            onClose={onClose}
            isOpen={isDialogOpen}
            title="Correct"
            primaryButtonProps={{
              disabled: false,
              label: 'Confirm',
              loading: false,
              onClick: onClose,
              size: 'm',
              variant: 'primary'
            }}
        >
            <p>
              This is a phishing email, because of the domain used in the origin email
            </p>
        </Dialog>

        <Button
            onClick={onPhishOption}
            variant="primary"
            size="l"
            label="Phish"
            />
        <Button
            onClick={onRealOption}
            variant="primary"
            size="l"
            label="Real"
            />
    </Flex>
  )
}

export default Options