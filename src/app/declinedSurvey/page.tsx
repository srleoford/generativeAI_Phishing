import React from 'react';

import {Heading, Flex, Background, Text} from '@/once-ui/components';
import Survey from '@/components/survey'
import RegisterCardWrapper from "@/components/register-form";

export default function RegisterPage() {

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
											Go
									</span>
                                </p>
                                <p>
									<span className="font-code">
											Phish!
									</span>
                                </p>
                            </Heading>
                        </Flex>
                    </Flex>
                </Flex>
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
                                <Text
                                    as="p"
                                    size="l"
                                    onSolid="brand-medium">
                                    Thank you for your interest. Have a good day!
                                </Text>
                            </Heading>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
