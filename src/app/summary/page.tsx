import React from 'react';
import Cookies from "js-cookie";
import { getAnswers } from '../utils/pinecone';
import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';

// const token = Cookies.get("token")
const token = Cookies.get("userToken");


/*
Classification results in different phase (pre-training, training and post training) and if possible then also block wise in training. 
Time spent phase wise.
Performance against specific persuasion strategy.  
Performance statistics, such as clicks, time per email, etc.
Showing the results using the graphs is a good idea. Let mw know if you have any other questions.
*/

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

const SummaryPage = async () => {
    const answers = await getAnswers(token)
    console.log(answers)

    // console.log("Ans phase 1:", answers[0].matches)
    // console.log("Ans phase 2:", answers[1].matches)
    // console.log("Ans phase 3:", answers[2].matches)

    // const jsonString1 = answers[0].matches[0].metadata?.results as  string;
    const jsonString2 = answers[1].matches[0].metadata?.results as  string;
    const jsonString3 = answers[2].matches[0].metadata?.results as  string;

    // console.log(answers[1].matches)
    // console.log("JSON:", jsonString2)

    // const jsonObject1 = JSON.parse(jsonString1);
    const jsonObject2 = JSON.parse(jsonString2);
    const jsonObject3 = JSON.parse(jsonString3);

    // console.log(jsonObject1)
    // console.log(jsonObject2)
    // console.log(jsonObject3)

    // const statsp1 = calculatePhaseStats(jsonObject1);
    const statsp2 = calculatePhaseStats(jsonObject2);
    const statsp3 = calculatePhaseStats(jsonObject3);

    // console.log(statsp1)
    // console.log(statsp2)
    // console.log(statsp3)

    const allPhasesData = [jsonObject2, jsonObject3];
    const overallStats = calculateAllPhasesStats(allPhasesData);



    return (
        <div>
            <h1>Test Summary</h1>
            <div>
                <h2>Block 1</h2>
                <p>Correct: {statsp2.totalCorrectChoices}</p>
                <p>Incorrect: {statsp2.totalIncorrectChoices}</p>
                <p>Total time spent: {statsp2.totalTimeSpent}</p>
                <p>Avg time spent per email: {statsp2.avgTimeSpent}</p>
                <p>Feedback: </p>
            </div>
            <div>
                <h2>Block 2</h2>
                <p>Correct: {statsp2.totalCorrectChoices}</p>
                <p>Incorrect: {statsp2.totalIncorrectChoices}</p>
                <p>Total time spent: {statsp2.totalTimeSpent}</p>
                <p>Avg time spent per email: {statsp2.avgTimeSpent}</p>
                <p>Feedback: </p>
            </div>  
            <div>
                <h2>Block 3</h2>
                <p>Correct: {statsp3.totalCorrectChoices}</p>
                <p>Incorrect: {statsp3.totalIncorrectChoices}</p>
                <p>Total time spent: {statsp3.totalTimeSpent}</p>
                <p>Avg time spent per email: {statsp3.avgTimeSpent}</p>
                <p>Feedback: </p>
            </div>
            <div>
                <h2>Summary</h2>
                <p>Correct: {overallStats.totalCorrectChoices}</p>
                <p>Incorrect: {overallStats.totalIncorrectChoices}</p>
                <p>Total time spent: {overallStats.totalTimeSpent}</p>
                <p>Avg time spent per email: {overallStats.avgTimeSpent}</p>
                <p>Feedback: </p>
            </div>
          
        </div>
    );
};

export default SummaryPage;