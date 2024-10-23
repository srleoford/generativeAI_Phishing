'use client'

import React from 'react';
import { Heading, Flex, Background } from '@/once-ui/components';
import { SignupForm } from '@/components/signup-form'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    //Gets the cookie containing the token, if a token has already been created, it means the user is navigating back and will send
    //them to the consent form
    const token = Cookies.get('userToken');
    console.log(token);
    if (token)
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
            </Flex>
            <Flex
                position="relative"
                as="section" overflow="hidden"
                fillWidth minHeight="0" maxWidth={68}
                direction="column" alignItems="center" flex={1}>
                <Flex
                    border="brand-medium"
                    borderStyle="solid-1"
                    direction="column"
                    gap="24"
                    padding="24"
                    alignItems="center"
                    justifyContent="center"
                    radius="xl"
                    onBackground="brand-strong"
                    background="brand-medium">
                    <SignupForm />
                </Flex>
            </Flex>
        </Flex>
    );
}
