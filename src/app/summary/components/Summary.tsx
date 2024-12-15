'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Analytics, Assessment, Person, QueryStats} from "@mui/icons-material";
import {useState} from "react";
import { TextField } from '@mui/material';
import {Background, Flex, Heading} from "@/once-ui/components";
import CollapsibleTable from "@/app/summary/components/table";
import {BarChart} from "@/app/summary/components/Bar";
import {PieChart} from "@/app/summary/components/Pie";

const drawerWidth = 240;

const icons = [<Assessment/>, <Person/>, <Analytics/>, <QueryStats/>]

interface SummaryProps {
    statsp1: any,
    statsp2: any,
    statsp3: any,
    emailsp1: any,
    emailsp2: any,
    emailsp3: any,
    overallStats: any
}

export default function Summary({ statsp1, statsp2, statsp3, emailsp1, emailsp2, emailsp3, overallStats }: SummaryProps) {
    const allStats = {
        statsp1,
        statsp2,
        statsp3,
        emailsp1,
        emailsp2,
        emailsp3,
        overallStats,
    }
    const [tabSelected, setTabSelected] = useState(0);
    const summary = overallStats

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Summary Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Performance Overview', 'User Interaction', 'Risk Actions', 'Other Data'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    selected={tabSelected === index}
                                    onClick={() => {setTabSelected(index)}}
                                >
                                    <ListItemIcon>{icons[index]}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {
                    tabSelected === 0 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CollapsibleTable
                            name={'Performance Overview'}
                            stats={allStats}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', width:600}}>
                            {/* Performance Overview Charts */}
                            <BarChart title="Correct vs Incorrect Choices" labels={["Correct", "Incorrect"]} data={[summary.totalCorrectChoices, summary.totalIncorrectChoices]} colors={["rgba(3, 171, 0, 0.96))", "rgb(203, 15, 56)"]}/>
                            <PieChart title="Time Spent on Each Phase" datalabel="Seconds" labels={["Phase 1", "Phase 2", "Phase 3"]} data={[statsp1.totalTimeSpent, statsp2.totalTimeSpent, statsp3.totalTimeSpent]} colors={["rgba(3, 171, 0, 0.96)", "rgb(244, 0, 0)", "rgb(0, 0, 255)"]}/>

                        </Box>
                    </Box>
                }
                {
                    tabSelected === 1 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CollapsibleTable
                            name={'User Interaction'}
                            stats={allStats}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', width:600}}>
                            {/* User Interaction Charts */}
                            <PieChart title="User Interactions" datalabel="Interactions" labels={["Link Hovers", "Attachments Opened", "Checked Sender", "Links Clicked"]} data={[summary.totalMouseHoverOverLinks, summary.totalOpeningAttachments, summary.totalSenderInteraction, summary.totalClickingBehavior]} colors={["rgba(3, 171, 0, 0.96)", "rgba(244, 0, 0, 0.87)", "rgba(0, 0, 255, 0.95)", "rgb(249, 179, 0)"]}/>
                        </Box>
                    </Box>
                }
                {
                    tabSelected === 2 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CollapsibleTable
                            name={'Risk Actions'}
                            stats={allStats}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', width:600}}>
                            {/* Risk Actions Charts */}
                            <PieChart title="Risk Actions" datalabel="Selections" labels={["Respond", "Open Attachment", "Check Sender", "Check Link", "Delete Email", "Report"]} data={[summary.totalSuggestedActionsCount["respond"], summary.totalSuggestedActionsCount["click_open"], summary.totalSuggestedActionsCount["checkSender"], summary.totalSuggestedActionsCount["checkLink"], summary.totalSuggestedActionsCount["delete"], summary.totalSuggestedActionsCount["report"],]} colors={["rgba(3, 171, 0, 0.96)", "rgba(244, 0, 0, 0.87)", "rgba(0, 0, 255, 0.95)", "rgb(249, 179, 0)", "rgba(255, 165, 0, 0.87)", "rgba(128, 0, 128, 0.87)"]}/>
                        </Box>
                    </Box>
                }
                {
                    tabSelected === 3 &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <CollapsibleTable
                            name={'Other Data'}
                            stats={allStats}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', width:600}}>
                            {/* Other Data Charts */}
                            <PieChart title="Trial Composition" datalabel="Items" labels={["Ham", "Phish", "Attention Checks"]} data={[summary.totalHamEmails, summary.totalPhishingEmails, summary.totalAttentionChecks]} colors={["rgba(3, 171, 0, 0.96)", "rgb(244, 0, 0)", "rgb(137, 137, 137)"]}/>
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    );
}
