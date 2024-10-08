import React from 'react';

import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';
// import { SignUpForm } from '@/components/signup-form'
import { register } from '@/app/actions/actions'

export default function RegisterPage() {
    async function createUser(formData: FormData) {
        'use server'

        // const rawFormData = {
        //     email: formData.get()
        // }
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
                    onSolid="brand-strong"
                    solid="brand-medium"
                >
                    {/*<SignUpForm register={register} type={"submit"}/>*/}
                </Flex>
            </Flex>
        </Flex>
    );
}
