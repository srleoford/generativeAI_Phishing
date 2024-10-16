import { Dialog } from '@/once-ui/components';
import React from 'react'


interface LeavingDialogProps {
  isOpen: boolean;
  yesCallback: () => void;
  noCallback: () => void;
};

export const LeavingDialog = ({ isOpen, yesCallback, noCallback }: LeavingDialogProps) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => noCallback()}
      title="The data will be lost."
      primaryButtonProps={{
        disabled: false,
        label: 'Confirm',
        loading: false,
        onClick: () => noCallback(),
        size: 'm',
        variant: 'primary'
      }}
      secondaryButtonProps={{
        disabled: false,
        label: 'Cancel',
        loading: false,
        onClick: () => yesCallback(),
        size: 'm',
        variant: 'secondary'
      }}
    >
      <p>
        Are you sure you want to leave the page?
      </p>
    </Dialog>
  )
};