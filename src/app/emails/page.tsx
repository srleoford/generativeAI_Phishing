import {Background, Flex} from '@/once-ui/components'
import React from 'react'
import {ResponseRoute} from '../api/phases/route'
import EmailContainer, {EmailData} from './_components/EmailContainer'
import HandlePhasesNavigation from "@/components/cookies-email-phases";
import {cookies} from "next/headers";

const EmailsPage = async () => {
    const cookieStore = await cookies()
    const survey = cookieStore.get('survey')?.value

    const data = await fetch('http://localhost:3000/api/phases', {cache: 'no-store'})
    const routeResponse: ResponseRoute = await data.json()

    let emailsContent: EmailData[]
    let newRoute: string

    switch (routeResponse.route) {

        case "phase_1": {
            newRoute = "phase_2"
            const datasetEmails = await fetch('http://localhost:3000/api/dataset', {cache: 'no-store'})
            emailsContent = await datasetEmails.json()
            break
        }

        case "phase_2": {
            newRoute = "phase_3"
            const openaiEmails = await fetch(
                'http://localhost:3000/api/generateEmails',
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            survey,
                            difficulty: 10,
                        }
                    ),
                    cache: 'no-store'
                }
            )
            emailsContent = await openaiEmails.json()
            break
        }

        case "phase_3": {
            newRoute = "phase_0"
            const openaiEmails = await fetch(
                'http://localhost:3000/api/generateEmails',
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            survey,
                            difficulty: 10,
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