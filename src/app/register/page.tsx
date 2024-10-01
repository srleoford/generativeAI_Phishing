"use client";

import React from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';
import Survey from '@/components/survey'

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
                <Flex
                    as="main"
                    direction="column" justifyContent="center"
                    fillWidth fillHeight padding="l" gap="l">
                    <Flex
                        mobileDirection="column"
                        fillWidth gap="24">
                        <Flex
                            position="relative"
                            flex={4} gap="24" marginBottom="104"
                            direction="column">
                            <Heading
                                wrap="balance"
                                variant="display-strong-s"
                                align="center">
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
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                position="relative"
                as="section" overflow="hidden"
                fillWidth minHeight="0" maxWidth={68}
                direction="column" alignItems="center" flex={1}>
                <p>
                </p>
                <br/>
                <Flex>
                    <Button
                        href="register"
                        suffixIcon="chevronRight"
                        variant="secondary">
                        Accept
                    </Button>
                    <Button
                        href="#"
                        suffixIcon="chevronRight"
                        variant="secondary">
                        Decline
                    </Button>
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
