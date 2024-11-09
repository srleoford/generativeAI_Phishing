"use server"

import {Background, Flex, Text} from '@/once-ui/components'
import React from 'react'
import {phase1Body, phase1Title, phase2Title, phase3Title, phase2Body, phase3Body} from './constants';
import InstructionsBody from './_components/InstructionsBody';
import {ResponseRoute} from '../api/phases/route';
import HandlePhasesNavigation from '@/components/cookies-email-phases'

const InstructionsPage = async () => {
    let title, body: string

    let data = await fetch('http://localhost:3000/api/phases', {cache: 'no-store'})
    let response: ResponseRoute = await data.json()
    //console.log(response.route)
    switch (response.route) {

        case "phase_1": {
            title = phase1Title
            body = phase1Body
            break
        }

        case "phase_2": {
            title = phase2Title
            body = phase2Body
            break
        }

        case "phase_3": {
            title = phase3Title
            body = phase3Body
            break
        }

        default: {
            title = "Thank you, now you can close the browser"
            body = ""
            break
        }
    }

    return (
        <Flex
            fillWidth
            fillHeight
            padding='l'
            alignItems="center" flex={1}
        >
            <Background
                position='absolute'/>

            <InstructionsBody
                title={title}
                description={body}
            />
            <HandlePhasesNavigation route={response.route + '_instructions'}/>
        </Flex>
    )
}

export default InstructionsPage