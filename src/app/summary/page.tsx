'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAnswers } from '../utils/pinecone';
import { Heading, Flex, Background } from '@/once-ui/components';
import CollapsibleTable from './components/table';
import { BarChart } from './components/Bar';
import { PieChart } from './components/Pie'

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
    "report": 0,
    "delete": 0,
    "respond": 0,
    "checkSender": 0,
    "checkLink": 0,
    "click_open": 0
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
    interactions.suggestedActions.forEach((action: string) => suggestedActionsCount[action]++);
 
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
  overallStats.avgTimeSpent = parseFloat((overallStats.totalTimeSpent / overallStats.totalEmails).toFixed(2));
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
    // Cookies.set('userToken','ZW1haWxAZW5jby5jb20zMGYzMDQwMzBlMDVmOTc3MjNkNWVkNDhlOWYzMzQ5YQ==')
    const token = Cookies.get('userToken');
    // console.log(token)
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
        <Flex position="relative" flex={4} gap="24" marginBottom="104" direction="row" align="center">
          <CollapsibleTable stats={overallStats} />
          <Flex direction="column" gap="24">
            {/* Performance Overview Charts */}
            <BarChart title="Correct vs Incorrect Choices" labels={["Correct", "Incorrect"]} data={[summary.totalCorrectChoices, summary.totalIncorrectChoices]} colors={["rgba(3, 171, 0, 0.96))", "rgb(203, 15, 56)"]}/>
            <PieChart title="Time Spent on Each Phase" datalabel="Seconds" labels={["Phase 1", "Phase 2", "Phase 3"]} data={[statsp1.totalTimeSpent, statsp2.totalTimeSpent, statsp3.totalTimeSpent]} colors={["rgba(3, 171, 0, 0.96)", "rgb(244, 0, 0)", "rgb(0, 0, 255)"]}/>
            {/* User Interaction Charts */}
            <PieChart title="User Interactions" datalabel="Interactions" labels={["Link Hovers", "Attachments Opened", "Checked Sender", "Links Clicked"]} data={[summary.totalMouseHoverOverLinks, summary.totalOpeningAttachments, summary.totalSenderInteraction, summary.totalClickingBehavior]} colors={["rgba(3, 171, 0, 0.96)", "rgba(244, 0, 0, 0.87)", "rgba(0, 0, 255, 0.95)", "rgb(249, 179, 0)"]}/>
            {/* Risk Actions Charts */}
            <PieChart title="Risk Actions" datalabel="Selections" labels={["Respond", "Open Attachment", "Check Sender", "Check Link", "Delete Email", "Report"]} data={[summary.totalSuggestedActionsCount["respond"], summary.totalSuggestedActionsCount["click_open"], summary.totalSuggestedActionsCount["checkSender"], summary.totalSuggestedActionsCount["checkLink"], summary.totalSuggestedActionsCount["delete"], summary.totalSuggestedActionsCount["report"],]} colors={["rgba(3, 171, 0, 0.96)", "rgba(244, 0, 0, 0.87)", "rgba(0, 0, 255, 0.95)", "rgb(249, 179, 0)", "rgba(255, 165, 0, 0.87)", "rgba(128, 0, 128, 0.87)"]}/>
            {/* Other Data Charts */}
            <PieChart title="Trial Composition" datalabel="Items" labels={["Ham", "Phish", "Attention Checks"]} data={[summary.totalHam, summary.totalPhishing, summary.totalHam]} colors={["rgba(3, 171, 0, 0.96)", "rgb(244, 0, 0)", "rgb(137, 137, 137)"]}/>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SummaryPage;
