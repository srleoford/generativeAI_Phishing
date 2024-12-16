import Summary from "@/app/summary/components/Summary";
import {cookies} from "next/headers";
import {getAnswers} from "@/app/utils/pinecone";
import {useRouter} from "next/navigation";

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
    // const emails = email.emails;
    // console.log(emails);

    if (interactions.mouseHoverOverLinks) totalMouseHoverOverLinks++;
    if (interactions.clickingBehavior) totalClickingBehavior++;
    if (interactions.senderInteraction) totalSenderInteraction++;
    if (interactions.openingAttachments) totalOpeningAttachments++;
    interactions.isCorrect ? totalCorrectChoices++ : totalIncorrectChoices++;
    if (interactions.choice.toLowerCase() === 'ham') {
      if (interactions.isCorrect) {
      totalHam++;
      } else {
      totalPhishing++;
      }
    } else if (interactions.choice.toLowerCase() === 'phishing') {
      if (interactions.isCorrect) {
      totalPhishing++;
      } else {
      totalHam++;
      }
    }
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

const calculateAllPhasesStats = (allPhasesData: any[], allEmailsData: any[]) => {
  const overallStats = {
    totalMouseHoverOverLinks: allPhasesData.reduce((n, {totalMouseHoverOverLinks}) => n + totalMouseHoverOverLinks, 0),
    totalClickingBehavior: allPhasesData.reduce((n, {totalClickingBehavior}) => n + totalClickingBehavior, 0),
    totalSenderInteraction: allPhasesData.reduce((n, {totalSenderInteraction}) => n + totalSenderInteraction, 0),
    totalOpeningAttachments: allPhasesData.reduce((n, {totalOpeningAttachments}) => n + totalOpeningAttachments, 0),
    totalCorrectChoices: allPhasesData.reduce((n, {totalCorrectChoices}) => n + totalCorrectChoices, 0),
    totalIncorrectChoices: allPhasesData.reduce((n, {totalIncorrectChoices}) => n + totalIncorrectChoices, 0),
    totalTimeSpent: allPhasesData.reduce((n, {totalTimeSpent}) => n + totalTimeSpent, 0),
    totalTimeSpentInMinutes: '',
    totalEmails: allEmailsData.reduce((n, {totalEmails}) => n + totalEmails, 0),
    avgTimeSpent: 0,
    totalSuggestedActionsCount: {} as { [key: string]: number },
    totalAttentionChecks: allEmailsData.reduce((n, {totalAttentionChecks}) => n + totalAttentionChecks, 0),
    totalHamEmails: allEmailsData.reduce((n, { totalHamEmails }) => n + totalHamEmails, 0),
    totalPhishingEmails: allEmailsData.reduce((n, { totalPhishingEmails }) => n + totalPhishingEmails, 0),
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

const calculateEmailStats = (allPhasesEmailData: any[]) => {
  const overallEmailStats = {
    totalHamEmails: 0,
    totalPhishingEmails: 0,
    totalAttentionChecks: 0,
    totalEmails: 0
  };

  allPhasesEmailData.forEach((email) => {
    switch (email.email?.type) {
      case "Ham":
        overallEmailStats.totalHamEmails++;
        break;
      case "Phishing":
        overallEmailStats.totalPhishingEmails++;
        break;
      case "Attention_check":
        overallEmailStats.totalAttentionChecks++;
        break;
      default:
        break; // Ignore unknown types
    }
  });
  overallEmailStats.totalEmails = overallEmailStats.totalHamEmails + overallEmailStats.totalPhishingEmails;
  return overallEmailStats;
};

const SummaryPage = async () => {

  const cookieStore = await cookies()
  const userToken = cookieStore.get('token')?.value || ""

  let response = await getAnswers(userToken)

  // Wait until Pinecone finish the upsert of all phases
  while (response[0].matches.length === 0 || response[1].matches.length === 0 || response[2].matches.length === 0) {
    response = await getAnswers(userToken)
  }

  const phase1Response = response[0].matches[0].metadata?.results as string;
  const phase1Emails = response[0].matches[0].metadata?.emails as string;
  const phase2Response = response[1].matches[0].metadata?.results as string;
  const phase2Emails = response[1].matches[0].metadata?.emails as string;
  const phase3Response = response[2].matches[0].metadata?.results as string;
  const phase3Emails = response[2].matches[0].metadata?.emails as string;

  const statsp1 = calculatePhaseStats(JSON.parse(phase1Response));
  const statsp2 = calculatePhaseStats(JSON.parse(phase2Response));
  const statsp3 = calculatePhaseStats(JSON.parse(phase3Response));
  const emailsp1 = calculateEmailStats(JSON.parse(phase1Emails))
  const emailsp2 = calculateEmailStats(JSON.parse(phase2Emails))
  const emailsp3 = calculateEmailStats(JSON.parse(phase3Emails))


  const allPhasesData = [statsp1, statsp2, statsp3];
  const allEmailsData = [emailsp1, emailsp2, emailsp3];
  const overallStats = calculateAllPhasesStats(allPhasesData, allEmailsData);

  return (
      <Summary
          statsp1={statsp1}
          statsp2={statsp2}
          statsp3={statsp3}
          emailsp1={emailsp1}
          emailsp2={emailsp2}
          emailsp3={emailsp3}
          overallStats={overallStats}
      />
  )
}

export default SummaryPage;
