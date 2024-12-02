import React, { useState } from 'react';
import { Button, Chip, Dialog, Flex, Checkbox, Text } from '@/once-ui/components';
import { EmailData } from './EmailContainer';
import styles from '@/app/emails/_components/sidebar/SideBar.module.css';

export interface FeedbackMessage {
  title: string;
  body: string;
}

export interface OptionsProps {
  email: EmailData;
  feedbackMessage: FeedbackMessage;
  onClose: () => void;
  isDialogOpen: boolean;
  onPhishOption: (type: string) => void;
  onRealOption: (type: string) => void;
  onSetAction: (action: string) => void;
  feedbackSuggestion: string;
}

const Options = (props: OptionsProps) => {
  const isChoiceDisable = props.email.interactions.isCorrect !== undefined;
  const isActionDisable = props.email.interactions.suggestedAction !== "";

  // Local state to track the selected action
  const [selectedAction, setSelectedAction] = useState(props.feedbackSuggestion);

  const handleCheckboxChange = (value: string) => {
    setSelectedAction(value);
    props.onSetAction(value);  // Call the provided handler with the new action
  };

  // Options for the checkbox group
  const actionOptions = [
    { label: 'Respond to this email', value: 'respond' },
    { label: 'Click Link/Open attachment', value: 'click_open' },
    { label: 'Check sender', value: 'checkSender' },
    { label: 'Check link', value: 'checkLink' },
    { label: 'Delete email', value: 'delete' },
    { label: 'Report this email', value: 'report' }
  ];

  return (
    <Flex direction="row" gap="m">
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
        <p>{props.feedbackMessage.body}</p>
      </Dialog>

      <Flex fillWidth justifyContent="space-between" direction="row" gap="16">
        <Flex direction="row" alignItems="center" gap="m">
          <Button
            onClick={() => props.onPhishOption("Phishing")}
            variant="primary"
            size="l"
            label="Phish"
            disabled={isChoiceDisable}
          />
          <Button
            onClick={() => props.onRealOption("Ham")}
            variant="primary"
            size="l"
            label="Real"
            disabled={isChoiceDisable}
          />
          {props.email.interactions.choice !== "" && (
            <Chip label={props.email.interactions.choice} selected onClick={() => {}} />
          )}
        </Flex>

        <Flex direction="column" className={styles.suggestedAction}>
          <Text>Select suggested actions:</Text>
          {actionOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              isChecked={selectedAction === option.value}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={isActionDisable}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Options;
