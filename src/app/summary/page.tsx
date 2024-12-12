'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAnswers } from '../utils/pinecone';
import { Heading, Flex, Background } from '@/once-ui/components';
import CollapsibleTable from './table';

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
  let totalEmails = phaseData.length
  const suggestedActionsCount: { [key: string]: number } = 
  {
    report: 0,
    delete: 0,
    respond: 0,
    checkSender: 0,
    checkLink: 0,
    click_open: 0
  };

  phaseData.forEach((email) => {
    const interactions = email.interactions;

    if (interactions.mouseHoverOverLinks) totalMouseHoverOverLinks++;
    if (interactions.clickingBehavior) totalClickingBehavior++;
    if (interactions.senderInteraction) totalSenderInteraction++;
    if (interactions.openingAttachments) totalOpeningAttachments++;
    interactions.isCorrect ? totalCorrectChoices++ : totalIncorrectChoices++;
    interactions.choice.toLowerCase() === 'ham' ? totalHam++ : totalPhishing++;
    totalTimeSpent += interactions.timeSpent;
    suggestedActionsCount[interactions.suggestedAction]++;
  });

  const avgTimeSpent = (totalTimeSpent / phaseData.length).toFixed(2);
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
    suggestedActionsCount,
    totalEmails
  };
};

const calculateAllPhasesStats = (allPhasesData: any[]) => {
  const overallStats = {
    totalMouseHoverOverLinks: allPhasesData.reduce((n, {totalMouseHoverOverLinks}) => n + totalMouseHoverOverLinks, 0),
    totalClickingBehavior: allPhasesData.reduce((n, {totalClickingBehavior}) => n + totalClickingBehavior, 0),
    totalSenderInteraction: allPhasesData.reduce((n, {totalSenderInteraction}) => n + totalSenderInteraction, 0),
    totalOpeningAttachments: allPhasesData.reduce((n, {totalOpeningAttachments}) => n + totalOpeningAttachments, 0),
    totalCorrectChoices: allPhasesData.reduce((n, {totalCorrectChoices}) => n + totalCorrectChoices, 0),
    totalIncorrectChoices: allPhasesData.reduce((n, {totalIncorrectChoices}) => n + totalIncorrectChoices, 0),
    totalTimeSpent: allPhasesData.reduce((n, {totalTimeSpent}) => n + totalTimeSpent, 0),
    totalTimeSpentInMinutes: '',
    totalEmails: allPhasesData.reduce((n, {totalEmails}) => n + totalEmails, 0),
    avgTimeSpent: 0,
    totalHam: allPhasesData.reduce((n, {totalHam}) => n + totalHam, 0),
    totalPhishing: allPhasesData.reduce((n, {totalPhishing}) => n + totalPhishing, 0),
    totalSuggestedActionsCount: {} as { [key: string]: number }
  };

  allPhasesData.forEach((phaseStats) => {
    Object.keys(phaseStats.suggestedActionsCount).forEach((action) => {
      if (overallStats.totalSuggestedActionsCount[action]) {
        overallStats.totalSuggestedActionsCount[action] += phaseStats.suggestedActionsCount[action];
      } else {
        overallStats.totalSuggestedActionsCount[action] = phaseStats.suggestedActionsCount[action];
      }
    });
  });

  // Calculate overall average time spent
  overallStats.avgTimeSpent = (overallStats.totalTimeSpent / overallStats.totalEmails).toFixed(2);
  overallStats.totalTimeSpentInMinutes = `${Math.floor(overallStats.totalTimeSpent / 60)}:${Math.floor(overallStats.totalTimeSpent % 60).toString().padStart(2, '0')}`;
  return overallStats;
};

const SummaryPage = () => {
  const [answers, setAnswers] = useState<any[]>([]);
const [overallStats, setOverallStats] = useState<any>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the token using js-cookie
    //Cookies.set('userToken','dGVzdEB0ZXN0LmNvbTkyYWVmMWVkZWMyOGI0MjhjOWJmYTE2ZTdlYzNhZGIz')
    const token = Cookies.get('userToken');
    console.log(token)
    if (token) {
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay
        const response = await getAnswers(userToken);        
        setAnswers(response);

        const phase1Response = response[0].matches[0].metadata?.results as string;
        const phase2Response = response[1].matches[0].metadata?.results as string;
        const phase3Response = response[2].matches[0].metadata?.results as string;
        const statsp1 = calculatePhaseStats(JSON.parse(phase1Response));
        const statsp2 = calculatePhaseStats(JSON.parse(phase2Response));
        const statsp3 = calculatePhaseStats(JSON.parse(phase3Response));

        const allPhasesData = [statsp1, statsp2, statsp3];
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
                <p><span className="font-code">Summary</span></p>
              </Heading>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex mobileDirection="column" fillWidth gap="24">
        <Flex position="relative" flex={4} gap="24" marginBottom="104" direction="column" align="center">
        <CollapsibleTable stats={overallStats} />
        </Flex>
      </Flex>
          </Flex>
  );
};

export default SummaryPage;
