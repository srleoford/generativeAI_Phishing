import { Background, Flex } from '@/once-ui/components'
import React from 'react'
import HandlePhasesNavigation from '@/components/cookies-email-phases'
import { ResponseRoute } from '../api/phases/route'
import EmailContainer, { EmailData } from './_components/EmailContainer'
import { DatasetEmail } from '../api/dataset/route'

const EmailsPage = async () => {

  let data = await fetch('http://localhost:3000/api/phases', {cache: 'no-store'})
  let datasetEmails = await fetch('http://localhost:3000/api/dataset', {cache: 'no-store'})

  let routeResponse: ResponseRoute = await data.json()
  let emailsResponse: DatasetEmail[] = await datasetEmails.json()

  let emailsContent: EmailData[] = emailsResponse.map(email => (
    {
      body: email.email,
      subject: email.subject,
      date: "Nov 23, 2024, 11:25 AM",
      from: email.sender,
      to: "userEmail@utep.com",
      emailType: email.emailtype
    }
  ))
  let requireFeedback = false
  let newRoute = "phase_1"
  
  switch(routeResponse.route) {

    case "phase_1": {
      newRoute = "phase_2"
      break
    }

    case "phase_2": {
      requireFeedback = true
      newRoute = "phase_3"
      break
    }

    case "phase_3": {
      requireFeedback = false
      newRoute = "phase_0"
      break
    }

    default: {
      break
    }
  }

  const postData = {
    newRoute: newRoute
  }

  await fetch(
    'http://localhost:3000/api/phases',
    {
      method: 'POST',
      body: JSON.stringify(postData),
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
        requireFeedback={requireFeedback}
      />
      <HandlePhasesNavigation route={routeResponse.route + '_emails'} />
    </Flex>
  )
}

export default EmailsPage