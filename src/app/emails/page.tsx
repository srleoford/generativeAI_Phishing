import {Background, Flex} from '@/once-ui/components'
import React from 'react'
import {ResponseRoute} from '../api/phases/route'
import EmailContainer, {EmailData} from './_components/EmailContainer'
import HandlePhasesNavigation from "@/components/cookies-email-phases";
import {cookies} from "next/headers";
import {numberOfPhase3Emails,numberOfBlocksPhase2,numberOfEmailsPerBlock} from  '../emails/emailsConfiguration'

/**
 * EmailsPage Component
 * This component manages email generation based on different phases of the phishing training application.
 * It handles route changes, email fetching, and rendering the appropriate email content.
 */
const EmailsPage = async () => {
    // Retrieve survey data from cookies
    const cookieStore = await cookies()
    const survey = cookieStore.get('survey')?.value

    // Fetch the current phase from the backend
    const data = await fetch('http://localhost:3000/api/phases', {cache: 'no-store'})
    const routeResponse: ResponseRoute = await data.json()

    let emailsContent: EmailData[]
    let attentionCheckContent: EmailData[]
    let newRoute: string

    // Determine the next action based on the current phase
    switch (routeResponse.route) {

        case "phase_1": {
            // Transition to phase_2 and fetch initial dataset emails
            newRoute = "phase_2"
            const datasetEmails = await fetch('http://localhost:3000/api/dataset', {cache: 'no-store'})
            emailsContent = await datasetEmails.json()
            break
        }

        case "phase_2": {
            // Transition to phase_3 and generate emails using OpenAI API
            newRoute = "phase_3"
            const openaiEmails = await fetch(
                'http://localhost:3000/api/generateEmails',
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            survey,
                            difficulty: 10,
                            numberOfEmails: numberOfEmailsPerBlock
                        }
                    ),
                    cache: 'no-store'
                }
            )

            emailsContent = await openaiEmails.json()

             // Select a random block from the total number of blocks
            const randomIndex = Math.floor(Math.random() * numberOfBlocksPhase2);

            // Check if the randomly selected block is the first block
            let isFirstSelected = randomIndex === 0;
            isFirstSelected = true
            if (isFirstSelected) {
                //Get random attention check and add it to block of emails
                const attentionCheckData = await fetch('http://localhost:3000/api/dataset', {method:'POST',cache: 'no-store'})
                attentionCheckContent = await attentionCheckData.json()
                emailsContent = emailsContent.concat(attentionCheckContent)
            }
            break
        }

        case "phase_3": {
            // Reset to phase_0 and generate new emails for evaluation
            newRoute = "phase_0"
            const openaiEmails = await fetch(
                'http://localhost:3000/api/generateEmails',
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            survey,
                            difficulty: 10,
                            numberOfEmails: numberOfPhase3Emails
                        }
                    ),
                    cache: 'no-store'
                }
            )
            emailsContent = await openaiEmails.json()
            break
        }

        default: {
            newRoute = "phase_1"
            emailsContent = []
            break
        }
    }

    // Update the current phase on the backend
    await fetch('http://localhost:3000/api/phases',
        {
            method: 'POST',
            body: JSON.stringify({ newRoute }),
            cache: 'no-store'
        }
    )

    return (
        <Flex
            fillWidth
            fillHeight
            padding='l'
            direction='row'
            gap='xs'
            alignItems="center"
            position='absolute'
        >
            <Background
                position='absolute'
                dots={false}/>

            <EmailContainer
                emailsData={emailsContent}
                phase={routeResponse.route}
            />
            <HandlePhasesNavigation route={routeResponse.route + '_emails'}/>
        </Flex>
    )
}

export default EmailsPage