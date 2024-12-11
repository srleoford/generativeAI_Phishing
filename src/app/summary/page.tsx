'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAnswers } from '../utils/pinecone';
import { Heading, Text, Flex, Background } from '@/once-ui/components';

const calculatePhaseStats = (phaseData: any[]) => {
  let totalMouseHoverOverLinks = 0;
  let totalClickingBehavior = 0;
  let totalTimeSpent = 0;
  let totalTimeSpentInMinutes = '';
  let totalSenderInteraction = 0;
  let totalOpeningAttachments = 0;
  let totalCorrectChoices = 0;
  let totalIncorrectChoices = 0;
  let totalHam = 0;
  let totalPhishing = 0;
  const suggestedActionsCount: { [key: string]: number } = {};

  phaseData.forEach((email) => {
    const interactions = email.interactions;

    if (interactions.mouseHoverOverLinks) totalMouseHoverOverLinks++;
    if (interactions.clickingBehavior) totalClickingBehavior++;
    if (interactions.senderInteraction) totalSenderInteraction++;
    if (interactions.openingAttachments) totalOpeningAttachments++;
    if (interactions.isCorrect) totalCorrectChoices++;
    else totalIncorrectChoices++;
    if (interactions.choice === 'Ham') totalHam++;
    else totalPhishing++;
    totalTimeSpent += interactions.timeSpent;
    if (interactions.suggestedAction) {
      if (suggestedActionsCount[interactions.suggestedAction]) {
      suggestedActionsCount[interactions.suggestedAction]++;
      } else {
      suggestedActionsCount[interactions.suggestedAction] = 1;
      }
    }
  });

  const avgTimeSpent = totalTimeSpent / phaseData.length;
  totalTimeSpentInMinutes = `${Math.floor(totalTimeSpent / 60)}:${Math.floor(totalTimeSpent % 60).toString().padStart(2, '0')}m`;

  return {
    totalMouseHoverOverLinks,
    totalClickingBehavior,
    totalSenderInteraction,
    totalOpeningAttachments,
    totalCorrectChoices,
    totalIncorrectChoices,
    totalHam,
    totalPhishing,
    totalTimeSpent,
    totalTimeSpentInMinutes,
    avgTimeSpent,
    suggestedActionsCount
  };
};

const calculateAllPhasesStats = (allPhasesData: any[][]) => {
  const overallStats = {
    totalMouseHoverOverLinks: 0,
    totalClickingBehavior: 0,
    totalSenderInteraction: 0,
    totalOpeningAttachments: 0,
    totalCorrectChoices: 0,
    totalIncorrectChoices: 0,
    totalTimeSpent: 0,
    totalTimeSpentInMinutes: '',
    totalEmails: 0,
    avgTimeSpent: 0,
    totalHam: 0,
    totalPhishing: 0,
    totalSuggestedActionsCount: {} as { [key: string]: number }
  };

  allPhasesData.forEach((phaseData) => {
    const phaseStats = calculatePhaseStats(phaseData);

    overallStats.totalMouseHoverOverLinks += phaseStats.totalMouseHoverOverLinks;
    overallStats.totalClickingBehavior += phaseStats.totalClickingBehavior;
    overallStats.totalSenderInteraction += phaseStats.totalSenderInteraction;
    overallStats.totalOpeningAttachments += phaseStats.totalOpeningAttachments;
    overallStats.totalCorrectChoices += phaseStats.totalCorrectChoices;
    overallStats.totalIncorrectChoices += phaseData.length - phaseStats.totalCorrectChoices;
    overallStats.totalTimeSpent += phaseStats.totalTimeSpent;
    overallStats.totalEmails += phaseData.length;
    overallStats.totalHam += phaseStats.totalHam;
    overallStats.totalPhishing += phaseStats.totalPhishing;
    Object.keys(phaseStats.suggestedActionsCount).forEach((action) => {
      if (overallStats.totalSuggestedActionsCount[action]) {
        overallStats.totalSuggestedActionsCount[action] += phaseStats.suggestedActionsCount[action];
      } else {
        overallStats.totalSuggestedActionsCount[action] = phaseStats.suggestedActionsCount[action];
      }
    });
  });

  // Calculate overall average time spent
  overallStats.avgTimeSpent = overallStats.totalTimeSpent / overallStats.totalEmails;
  overallStats.totalTimeSpentInMinutes = `${Math.floor(overallStats.totalTimeSpent / 60)}:${Math.floor(overallStats.totalTimeSpent % 60).toString().padStart(2, '0')}`;
  return overallStats;
};

const SummaryPage = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the token using js-cookie
    Cookies.set('userToken','cmVib2xhZG9AZ21haWwuY29tZjJjMmQ1MjA3NjYwMzRkNWQ2ODJhNGEyZWYxOGNhYzg=')
    const token = Cookies.get('userToken');
    if (token) {
      setUserToken(token);
    }
  }, []);

  const [answers, setAnswers] = useState<any[]>([]);
  const [overallStats, setOverallStats] = useState<any>(null);

  useEffect(() => {
    if (userToken) {
      (async () => {
        const response = await getAnswers(userToken);
        setAnswers(response);
        // console.log(response)

        const jsonString1 = response[0].matches[0].metadata?.results as string;
        const jsonString2 = response[1].matches[0].metadata?.results as string;
        const jsonString3 = response[2].matches[0].metadata?.results as string;
        // console.log(jsonString1)

        const jsonObject1 = JSON.parse(jsonString1);
        const jsonObject2 = JSON.parse(jsonString2);
        const jsonObject3 = JSON.parse(jsonString3);
        // console.log(jsonObject1)

        const statsp1 = calculatePhaseStats(jsonObject1);
        const statsp2 = calculatePhaseStats(jsonObject2);
        const statsp3 = calculatePhaseStats(jsonObject3);
        // console.log(statsp1)

        const allPhasesData = [jsonObject1, jsonObject2, jsonObject3];
        // console.log(allPhasesData)
        const overallStats = calculateAllPhasesStats(allPhasesData);

        setOverallStats({
          statsp1,
          statsp2,
          statsp3,
          overallStats,
        });
      })();
    }
  }, [userToken]);

  if (!overallStats) {
    return <p>Loading statistics...</p>;
  }

  const { statsp1, statsp2, statsp3, overallStats: summary } = overallStats;

  return (
    <Flex fillWidth paddingTop="l" paddingX="l" direction="column" alignItems="center" flex={1}>
      <Background dots={false} />
      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        minHeight="0"
        maxWidth={68}
        direction="column"
        alignItems="center"
        flex={1}
      >
        <Flex
          as="main"
          direction="column"
          justifyContent="center"
          fillWidth
          fillHeight
          padding="l"
          gap="l"
        >
          <Flex mobileDirection="column" fillWidth gap="24">
            <Flex position="relative" flex={4} gap="24" direction="column">
              <Heading variant="display-strong-s" align="center" wrap="balance">
                <p><span className="font-code">Test Summary</span></p>
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex mobileDirection="column" fillWidth gap="24">
        <Flex position="relative" flex={4} gap="24" marginBottom="104" direction="column" align="center">
          {/* Phase 1 Statistics */}
          <Flex as="section" direction="column" gap="8" padding="m">
            <Heading>Phase 1 Statistics</Heading>
            <Text>Correct: {statsp1.totalCorrectChoices}</Text>
            <Text>Incorrect: {statsp1.totalIncorrectChoices}</Text>
            <Text>Mouse Hovers: {statsp1.totalMouseHoverOverLinks}</Text>
            <Text>Clicks on Links: {statsp1.totalClickingBehavior}</Text>
            <Text>Sender Interaction: {statsp1.totalSenderInteraction}</Text>
            <Text>Attachments Opened: {statsp1.totalOpeningAttachments}</Text>
            <Text>Total Ham Emails: {statsp1.totalHam}</Text>
            <Text>Total Phishing Emails: {statsp1.totalPhishing}</Text>
            <Text>Total time spent: {statsp1.totalTimeSpentInMinutes}</Text>
            <Text>Avg time spent per email: {statsp1.avgTimeSpent.toFixed(2)}s</Text>
            <Heading>Actions Chosen</Heading>
            <Text>Respond to this Email: {statsp1.suggestedActionsCount["respond"] || 0}</Text>
            <Text>Click Link/Open attachment: {statsp1.suggestedActionsCount["click_open"] || 0}</Text>
            <Text>Check Sender: {statsp1.suggestedActionsCount["checkSender"] || 0}</Text>
            <Text>Check Link: {statsp1.suggestedActionsCount["checkLink"] || 0}</Text>
            <Text>Delete Email: {statsp1.suggestedActionsCount["delete"] || 0}</Text>
            <Text>Report Email: {statsp1.suggestedActionsCount["report"] || 0}</Text>
            
          </Flex>
          {/* Phase 2 Statistics */}
          <Flex as="section" direction="column" gap="8" padding="m">
            <Heading>Phase 2 Statistics</Heading>
            <Text>Correct: {statsp2.totalCorrectChoices}</Text>
            <Text>Incorrect: {statsp2.totalIncorrectChoices}</Text>
            <Text>Mouse Hovers: {statsp2.totalMouseHoverOverLinks}</Text>
            <Text>Clicks on Links: {statsp2.totalClickingBehavior}</Text>
            <Text>Sender Interaction: {statsp2.totalSenderInteraction}</Text>
            <Text>Attachments Opened: {statsp2.totalOpeningAttachments}</Text>
            <Text>Total Ham Emails: {statsp2.totalHam}</Text>
            <Text>Total Phishing Emails: {statsp2.totalPhishing}</Text>
            <Text>Total time spent: {statsp2.totalTimeSpentInMinutes}</Text>
            <Text>Avg time spent per email: {statsp2.avgTimeSpent.toFixed(2)}s</Text>
            <Heading>Actions Chosen</Heading>
            <Text>Respond to this Email: {statsp2.suggestedActionsCount["respond"] || 0}</Text>
            <Text>Click Link/Open attachment: {statsp2.suggestedActionsCount["click_open"] || 0}</Text>
            <Text>Check Sender: {statsp2.suggestedActionsCount["checkSender"] || 0}</Text>
            <Text>Check Link: {statsp2.suggestedActionsCount["checkLink"] || 0}</Text>
            <Text>Delete Email: {statsp2.suggestedActionsCount["delete"] || 0}</Text>
            <Text>Report Email: {statsp2.suggestedActionsCount["report"] || 0}</Text>
          </Flex>

          {/* Phase 3 Statistics */}
          <Flex as="section" direction="column" gap="8" padding="m">
            <Heading>Phase 3 Statistics</Heading>
            <Text>Correct: {statsp3.totalCorrectChoices}</Text>
            <Text>Incorrect: {statsp3.totalIncorrectChoices}</Text>
            <Text>Mouse Hovers: {statsp3.totalMouseHoverOverLinks}</Text>
            <Text>Clicks on Links: {statsp3.totalClickingBehavior}</Text>
            <Text>Sender Interaction: {statsp3.totalSenderInteraction}</Text>
            <Text>Attachments Opened: {statsp3.totalOpeningAttachments}</Text>
            <Text>Total Ham Emails: {statsp3.totalHam}</Text>
            <Text>Total Phishing Emails: {statsp3.totalPhishing}</Text>
            <Text>Total time spent: {statsp3.totalTimeSpentInMinutes}</Text>
            <Text>Avg time spent per email: {statsp3.avgTimeSpent.toFixed(2)}s</Text>
            <Heading>Actions Chosen</Heading>
            <Text>Respond to this Email: {statsp3.suggestedActionsCount["respond"] || 0}</Text>
            <Text>Click Link/Open attachment: {statsp3.suggestedActionsCount["click_open"] || 0}</Text>
            <Text>Check Sender: {statsp3.suggestedActionsCount["checkSender"] || 0}</Text>
            <Text>Check Link: {statsp3.suggestedActionsCount["checkLink"] || 0}</Text>
            <Text>Delete Email: {statsp3.suggestedActionsCount["delete"] || 0}</Text>
            <Text>Report Email: {statsp3.suggestedActionsCount["report"] || 0}</Text>
          </Flex>

          {/* Overall Summary */}
          <Flex as="section" direction="column" gap="8" padding="m">
            <Heading>Overall Summary</Heading>
            <Text>Correct: {summary.totalCorrectChoices}</Text>
            <Text>Incorrect: {summary.totalIncorrectChoices}</Text>
            <Text>Mouse Hovers: {summary.totalMouseHoverOverLinks}</Text>
            <Text>Clicks on Links: {summary.totalClickingBehavior}</Text>
            <Text>Sender Interaction: {summary.totalSenderInteraction}</Text>
            <Text>Attachments Opened: {summary.totalOpeningAttachments}</Text>
            <Text>Total Ham Emails: {summary.totalHam}</Text>
            <Text>Total Phishing Emails: {summary.totalPhishing}</Text>
            <Text>Total time spent: {summary.totalTimeSpentInMinutes}m</Text>
            <Text>Avg time spent per email: {summary.avgTimeSpent.toFixed(2)}s</Text>
            <Heading>Actions Chosen</Heading>
            <Text>Respond to this Email: {summary.totalSuggestedActionsCount["respond"] || 0}</Text>
            <Text>Click Link/Open attachment: {summary.totalSuggestedActionsCount["click_open"] || 0}</Text>
            <Text>Check Sender: {summary.totalSuggestedActionsCount["checkSender"] || 0}</Text>
            <Text>Check Link: {summary.totalSuggestedActionsCount["checkLink"] || 0}</Text>
            <Text>Delete Email: {summary.totalSuggestedActionsCount["delete"] || 0}</Text>
            <Text>Report Email: {summary.totalSuggestedActionsCount["report"] || 0}</Text>
          </Flex>
        </Flex>
      </Flex>
          </Flex>
  );
};

export default SummaryPage;
