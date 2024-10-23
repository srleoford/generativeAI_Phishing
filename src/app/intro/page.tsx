"use client";

import React from 'react';
import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';
import Survey from '@/components/survey'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
	//Gets the cookie containing the token, if it can't find it it will redirect to consent form
	//If the form has already been submitted, it will redirect to consent form
	const token = Cookies.get('userToken');
	const surveySubmitted = Cookies.get("surveySubmitted");
	console.log(token);
	if (!token || surveySubmitted === "true")
	{
		const router = useRouter(); 
		router.push("/")
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
								variant="display-strong-s"
								align="center"
								paddingTop="xl">
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
					<Survey/>
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
