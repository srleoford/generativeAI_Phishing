import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name: string, stats) {
    switch(name) {
        case 'Performance Overview':
            return {
                name,
                summaryData: [
                    {
                        metric: 'Correct Choices',
                        phase1: stats.statsp1.totalCorrectChoices,
                        phase2: stats.statsp2.totalCorrectChoices,
                        phase3: stats.statsp3.totalCorrectChoices,
                        overall: stats.overallStats.totalCorrectChoices
                    },
                    {
                        metric: 'Incorrect Choices',
                        phase1: stats.statsp1.totalIncorrectChoices,
                        phase2: stats.statsp2.totalIncorrectChoices,
                        phase3: stats.statsp3.totalIncorrectChoices,
                        overall: stats.overallStats.totalIncorrectChoices
                    },
                    {
                        metric: 'Average time spent per email (s)',
                        phase1: stats.statsp1.avgTimeSpent + 's',
                        phase2: stats.statsp2.avgTimeSpent + 's',
                        phase3: stats.statsp3.avgTimeSpent + 's',
                        overall: stats.overallStats.avgTimeSpent + 's'
                    },
                    {
                        metric: 'Total time spent (m)',
                        phase1: stats.statsp1.totalTimeSpentInMinutes,
                        phase2: stats.statsp2.totalTimeSpentInMinutes,
                        phase3: stats.statsp3.totalTimeSpentInMinutes,
                        overall: stats.overallStats.totalTimeSpentInMinutes + 'm'
                    }
                ]
            }
        case 'User Interaction':
            return {
                name,
                summaryData: [
                    {
                        metric: 'Number of times user hovered over a link',
                        phase1: stats.statsp1.totalMouseHoverOverLinks,
                        phase2: stats.statsp2.totalMouseHoverOverLinks,
                        phase3: stats.statsp3.totalMouseHoverOverLinks,
                        overall: stats.overallStats.totalMouseHoverOverLinks
                    },
                    {
                        metric: 'Number of attachments opened',
                        phase1: stats.statsp1.totalOpeningAttachments,
                        phase2: stats.statsp2.totalOpeningAttachments,
                        phase3: stats.statsp3.totalOpeningAttachments,
                        overall: stats.overallStats.totalOpeningAttachments
                    },
                    {
                        metric: 'Number of times user checked the sender',
                        phase1: stats.statsp1.totalSenderInteraction,
                        phase2: stats.statsp2.totalSenderInteraction,
                        phase3: stats.statsp3.totalSenderInteraction,
                        overall: stats.overallStats.totalSenderInteraction
                    },
                    {
                        metric: 'Suspicious Links Clicked',
                        phase1: stats.statsp1.totalClickingBehavior,
                        phase2: stats.statsp2.totalClickingBehavior,
                        phase3: stats.statsp3.totalClickingBehavior,
                        overall: stats.overallStats.totalClickingBehavior
                    }
                ]
            }
        case 'Risk Actions':
            return {
                name,
                summaryData: [
                    {
                        metric: 'Report Email',
                        phase1: stats.statsp1.suggestedActionsCount.report,
                        phase2: stats.statsp2.suggestedActionsCount.report,
                        phase3: stats.statsp3.suggestedActionsCount.report,
                        overall: stats.overallStats.totalSuggestedActionsCount.report
                    },
                    {
                        metric: 'Open attachment',
                        phase1: stats.statsp1.suggestedActionsCount.click_open,
                        phase2: stats.statsp2.suggestedActionsCount.click_open,
                        phase3: stats.statsp3.suggestedActionsCount.click_open,
                        overall: stats.overallStats.totalSuggestedActionsCount.click_open
                    },
                    {
                        metric: 'Check sender',
                        phase1: stats.statsp1.suggestedActionsCount.checkSender,
                        phase2: stats.statsp2.suggestedActionsCount.checkSender,
                        phase3: stats.statsp3.suggestedActionsCount.checkSender,
                        overall: stats.overallStats.totalSuggestedActionsCount.checkSender
                    },
                    {
                        metric: 'Check link',
                        phase1: stats.statsp1.suggestedActionsCount.checkLink,
                        phase2: stats.statsp2.suggestedActionsCount.checkLink,
                        phase3: stats.statsp3.suggestedActionsCount.checkLink,
                        overall: stats.overallStats.totalSuggestedActionsCount.checkLink
                    },
                    {
                        metric: 'Delete email',
                        phase1: stats.statsp1.suggestedActionsCount.delete,
                        phase2: stats.statsp2.suggestedActionsCount.delete,
                        phase3: stats.statsp3.suggestedActionsCount.delete,
                        overall: stats.overallStats.totalSuggestedActionsCount.delete
                    },
                    {
                        metric: 'Respond email',
                        phase1: stats.statsp1.suggestedActionsCount.respond,
                        phase2: stats.statsp2.suggestedActionsCount.respond,
                        phase3: stats.statsp3.suggestedActionsCount.respond,
                        overall: stats.overallStats.totalSuggestedActionsCount.respond
                    },
                ]
            }
        case 'Other Data':
            return {
                name,
                summaryData: [
                    {
                        metric: 'Total Phishing emails',
                        phase1: stats.emailsp1.totalPhishingEmails,
                        phase2: stats.emailsp2.totalPhishingEmails,
                        phase3: stats.emailsp3.totalPhishingEmails,
                        overall: stats.overallStats.totalPhishingEmails
                    },
                    {
                        metric: 'Total Real emails',
                        phase1: stats.emailsp1.totalHamEmails,
                        phase2: stats.emailsp2.totalHamEmails,
                        phase3: stats.emailsp3.totalHamEmails,
                        overall: stats.overallStats.totalHamEmails
                    },
                    {
                        metric: 'Total Attention Checks',
                        phase1: stats.emailsp1.totalAttentionChecks,
                        phase2: stats.emailsp2.totalAttentionChecks,
                        phase3: stats.emailsp3.totalAttentionChecks,
                        overall: stats.overallStats.totalAttentionChecks
                    },
                    {
                        metric: 'Total Emails',
                        phase1: stats.emailsp1.totalEmails,
                        phase2: stats.emailsp2.totalEmails,
                        phase3: stats.emailsp3.totalEmails,
                        overall: stats.overallStats.totalEmails
                    },
                ]
            }
    }
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Phase 1</TableCell>
                    <TableCell>Phase 2</TableCell>
                    <TableCell align="right">Phase 3</TableCell>
                    <TableCell align="right">Overall</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.summaryData.map((metricRow) => (
                    <TableRow key={metricRow.phase1}>
                      <TableCell>{metricRow.metric}</TableCell>
                      <TableCell component="th" scope="row">
                        {metricRow.phase1}
                      </TableCell>
                      <TableCell>{metricRow.phase2}</TableCell>
                      <TableCell align="right">{metricRow.phase3}</TableCell>
                      <TableCell align="right">{metricRow.overall}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({stats}) {
    console.log(stats)
    const rows = [
        createData('Performance Overview', stats),
        createData('User Interaction',stats),
        createData('Risk Actions',stats),
        createData('Other Data',stats)
      ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}