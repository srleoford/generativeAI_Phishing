"use client";

import React from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';
import Survey from '@/components/survey'

export default function Home() {
	/**
	 * 	The initial questions are grouped by category. Each category has an ID, title, and an array of questions.
	 * 		Each question has a question prompt ('questions'), answers ('options'), and response (for input from user)
	 */
	const initialQuestions = [
		{
			id: "demoQuestions",
			title: "Demographics",
			questions: [
				{
					question: "What is your age group?",
					options: [
						"18-30",
						"31-50",
						"51-60",
						"61 or older"
					],
					response: null
				},
				{
					question: "What is the highest level of education you have completed?",
					options: [
						"Less than high school",
						"High school diploma or equivalent",
						"Some college or associate degree",
						"Bachelor's degree",
						"Master's degree or higher"
					],
					response: null
				},
				{
					question: "What is your current job title or field of work?",
					options: [
						"IT professional (e.g., developer, engineer)",
						"Office worker (e.g., admin, sales, marketing",
						"Non-technical work (e.g., manual labor, service industry"
					],
					response: "Other (please specify):"
				},
				{
					question: "How would you rate your proficiency in understanding and using the English language?",
					options: [
						"Native or fluent speaker",
						"Advanced proficiency (can read, write, and speak effectively",
						"Intermediate proficiency (can handle basic communication)",
						"Beginner proficiency (limited understanding of English)",
						"No proficiency (do not speak or understand English)"
					],
					response: null
				}
			]
		},
		{
			id: "techQuestions",
			title: "Technical Knowledge and Security Training",
			questions: [
				{
					question: "Do you frequently work with technology (e.g., email, cloud platform, ?",
					options: [
						"Daily",
						"Occasionally",
						"Rarely"
					],
					response: null
				},
				{
					question: "How confident are you in your ability to identify phishing emails or scams?",
					options: [
						"Very confident (I have strong IT knowledge)",
						"Moderately confident (I can spot some scams)",
						"Not very confident (I rely on others to help)",
						"No confidence (I find it difficult to identify scams)"
					],
					response: null
				},
				{
					question: "Have you received any cybersecurity or phishing awareness training in the last 12 months?",
					options: [
						"Multiple times (e.g., quarterly or biannual training)",
						"Once (annual training)",
						"I haven't received any training"
					],
					response: null
				},
			]
		},
		{
			id: "socialQuestions",
			title: "Social and Environmental Factors",
			questions: [
				{
					question: "How often do you use social media (e.g., Facebook, LinkedIn, Instagram)?",
					options: [
						"Daily",
						"A few times a week",
						"Rarely or never"
					],
					response: null
				},
				{
					question: "Do you accept friend requests or connect with people you don't personally know on social media?",
					options: [
						"Yes, often",
						"Yes, occasionally",
						"No, never"
					],
					response: null
				},
				{
					question: "Do you share personal or work-related information on your social media profiles?",
					options: [
						"Yes, frequently",
						"Yes, occasionally",
						"No, never"
					],
					response: null
				},
				{
					question: "Does your organization conduct regular security training or simulated phishing attacks?",
					options: [
						"Yes, frequently",
						"Yes, occasionally",
						"No, never"
					],
					response: null
				}
			]
		},
		{
			id: "emoQuestions",
			title: "Emotional/Cognitive Bias",
			questions: [
				{
					question: "How do you typically respond to urgent emails requesting immediate action (e.g., account lockout, payment issues)?",
					options: [
						"I always verify the request before responding",
						"I sometimes respond quickly without verification",
						"I usually act immediately if the email looks legitimate"
					],
					response: null
				},
				{
					question: "Are you more likely to trust emails from senior management or authorities without question?",
					options: [
						"No, I always verify emails from authorities",
						"Sometimes, but I try to check for authenticity",
						"Yes, I usually trust emails from senior management or authorities"
					],
					response: null
				},
				{
					question: "How do you respond to unexpected rewards or offers (e.g., winning a prize, getting a free service)?",
					options: [
						"I always ignore such offers",
						"I sometimes check them out before ignoring",
						"I'm often curious and explore the offer"
					],
					response: null
				}
			]
		}
	]

	/**
	 * 	Scores for profiling the user from the results
	 */
	const profileScores = {
		"Low Risk": 1,
		"Moderate Risk": 2,
		"High Risk": 3
	}


	return (
		<Flex
			fillWidth paddingTop="l" paddingX="l"
			direction="column" alignItems="center" flex={1}>
			<Background
				dots={false}/>
			<Flex
				position="relative"
				as="section" overflow="hidden"
				fillWidth minHeight="0" maxWidth={68}
				direction="column" alignItems="center" flex={1}>
				<Flex
					as="main"
					direction="column" justifyContent="center"
					fillWidth fillHeight padding="l" gap="l">
					<Flex
						mobileDirection="column"
						fillWidth gap="24">
						{/*<Flex*/}
						{/*	position="relative"*/}
						{/*	flex={2} paddingTop="56" paddingX="xl">*/}
						{/*	<Logo size="xl" icon={false} style={{zIndex: '1'}}/>*/}
						{/*</Flex>*/}
						<Flex
							position="relative"
							flex={4} gap="24" marginBottom="104"
							direction="column">
							{/*<InlineCode*/}
							{/*	className="shadow-m"*/}
							{/*	style={{*/}
							{/*		width: 'fit-content',*/}
							{/*		padding: 'var(--static-space-8) var(--static-space-16)',*/}
							{/*		backdropFilter: 'blur(var(--static-space-1))'}}>*/}
							{/*	Start by editing <span className="brand-on-background-medium">app/page.tsx</span>*/}
							{/*</InlineCode>*/}
							<Heading
								wrap="balance"
								variant="display-strong-s">
								<p>
									<span className="font-code">
										<RevealFx
											speed="fast"
											delay={0}
											translateY={0}
										>
											Go
										</RevealFx>
									</span>
								</p>
								<p>
									<span className="font-code">
										<RevealFx
											speed="slow"
											delay={1}
											translateY={0}
										>
											Phish!
										</RevealFx>
									</span>
								</p>
							</Heading>
							{/*<Button*/}
							{/*	href="https://once-ui.com/docs"*/}
							{/*	suffixIcon="chevronRight"*/}
							{/*	variant="secondary">*/}
							{/*	Read docs*/}
							{/*</Button>*/}
						</Flex>
					</Flex>
					<Grid
						radius="l"
						border="neutral-medium"
						borderStyle="solid-1"
						columns="repeat(3, 1fr)"
						tabletColumns="1col"
						mobileColumns="1col"
						fillWidth>
						<Survey>

						</Survey>
					</Grid>
				</Flex>
			</Flex>
			{/* For the footer of the page */}
			<Flex
				as="footer"
				position="relative"
				fillWidth paddingX="l" paddingY="m"
				justifyContent="space-between">
			</Flex>
		</Flex>
	);
}
