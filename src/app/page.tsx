"use client";

import React from 'react';

import { Heading, Flex, Background, RevealFx } from '@/once-ui/components';
import { ConsentForm } from "@/components/consent-form"


export default function Home() {

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
                {/*
                    Main section of the webpage
                */}
                <Flex
                    as="main"
                    direction="column" justifyContent="center"
                    fillWidth fillHeight padding="l" gap="l">
                    <Flex
                        position="relative"
                        flex={4} gap="24" marginBottom="104"
                        direction="column">
                        {/*
                            Title for the page with EFX
                        */}
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
                                            delay={0}
                                            translateY={0}
                                        >
											Phish!
										</RevealFx>
									</span>
                            </p>
                        </Heading>

                        {/*
                            This section is for the consent form
                        */}
                        <Flex
                            position="relative"
                            as="section" overflow="hidden"
                            fillWidth minHeight="0" maxWidth={68}
                            direction="column" alignItems="flex-start" flex={1}>
                            <ConsentForm />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/*
                For the footer of the page.
            */}
            <Flex
                as="footer"
                position="relative"
                fillWidth paddingX="l" paddingY="m"
                justifyContent="space-between">
            </Flex>
        </Flex>
    );
}