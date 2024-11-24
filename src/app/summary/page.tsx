'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAnswers } from '../utils/pinecone';
import { Heading, Text, Flex, Background } from '@/once-ui/components';

const calculatePhaseStats = (phaseData: any[]) => {
  let totalMouseHoverOverLinks = 0;
  let totalClickingBehavior = 0;
  let totalTimeSpent = 0;
  let totalSenderInteraction = 0;
  let totalOpeningAttachments = 0;
  let totalCorrectChoices = 0;
  let totalIncorrectChoices = 0;

  phaseData.forEach((email) => {
    const interactions = email.interactions;

    if (interactions.mouseHoverOverLinks) totalMouseHoverOverLinks++;
    if (interactions.clickingBehavior) totalClickingBehavior++;
    if (interactions.senderInteraction) totalSenderInteraction++;
    if (interactions.openingAttachments) totalOpeningAttachments++;
    if (interactions.isCorrect) totalCorrectChoices++;
    else totalIncorrectChoices++;
    totalTimeSpent += interactions.timeSpent;
  });

  const avgTimeSpent = totalTimeSpent / phaseData.length;

  return {
    totalMouseHoverOverLinks,
    totalClickingBehavior,
    totalSenderInteraction,
    totalOpeningAttachments,
    totalCorrectChoices,
    totalIncorrectChoices,
    totalTimeSpent,
    avgTimeSpent,
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
    totalEmails: 0,
    avgTimeSpent: 0,
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
  });

  // Calculate overall average time spent
  overallStats.avgTimeSpent = overallStats.totalTimeSpent / overallStats.totalEmails;

  return overallStats;
};

const SummaryPage = () => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the token using js-cookie
    //Cookies.set('userToken','ZW1haWxAZW1haWwuY29tYTNhZDU5NWNhMGJmNjdhNzM3MGMzMzIzOTlkZTEzMjA=')
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
        console.log(response)
        const jsonString2 = response[1].matches[0].metadata?.results as string;
        const jsonString3 = response[2].matches[0].metadata?.results as string;

        const jsonObject2 = JSON.parse(jsonString2);
        const jsonObject3 = JSON.parse(jsonString3);

        const statsp2 = calculatePhaseStats(jsonObject2);
        const statsp3 = calculatePhaseStats(jsonObject3);

        const allPhasesData = [jsonObject2, jsonObject3];
        const overallStats = calculateAllPhasesStats(allPhasesData);

        setOverallStats({
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

  const { statsp2, statsp3, overallStats: summary } = overallStats;

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
            <Flex position="relative" flex={4} gap="24" marginBottom="104" direction="column">
              <Heading variant="display-strong-s" align="center" wrap="balance">
                <p><span className="font-code">Test Summary</span></p>
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Block 2 */}
      <Flex as="section">
        <Text>Correct: {statsp2.totalCorrectChoices}</Text>
        <Text>Incorrect: {statsp2.totalIncorrectChoices}</Text>
        <Text>Total time spent: {statsp2.totalTimeSpent}</Text>
        <Text>Avg time spent per email: {statsp2.avgTimeSpent}</Text>
      </Flex>
      {/* Block 3 */}
      <Flex as="section">
        <Text>Correct: {statsp3.totalCorrectChoices}</Text>
        <Text>Incorrect: {statsp3.totalIncorrectChoices}</Text>
        <Text>Total time spent: {statsp3.totalTimeSpent}</Text>
        <Text>Avg time spent per email: {statsp3.avgTimeSpent}</Text>
      </Flex>
      {/* Summary */}
      <Flex as="section">
        <Text>Correct: {summary.totalCorrectChoices}</Text>
        <Text>Incorrect: {summary.totalIncorrectChoices}</Text>
        <Text>Total time spent: {summary.totalTimeSpent}</Text>
        <Text>Avg time spent per email: {summary.avgTimeSpent}</Text>
      </Flex>
    </Flex>
  );
};

export default SummaryPage;
