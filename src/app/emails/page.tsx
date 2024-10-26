import { Background, Flex } from '@/once-ui/components'
import React from 'react'
import emailsBodyContentProfiling from './mocks/emailsContentProfiling.json'
import emailsDataProfiling from './mocks/emailsInfoProfiling.json'
import emailsBodyContent from './mocks/emailsContent.json'
import emailsData from './mocks/emailsInfo.json'
import { ResponseRoute } from '../api/phases/route'
import EmailContainer from './_components/EmailContainer'
import HandlePhasesNavigation from '@/components/cookies-email-phases'

const EmailsPage = async () => {

  let data = await fetch('http://localhost:3000/api/phases', {cache: 'no-store'})
  let response: ResponseRoute = await data.json()

  let emailsContent
  let emailsInfo
  let requireFeedback = false
  let newRoute = "phase_1"
  console.log(response.route)
  
  switch(response.route) {

    case "phase_1": {
      emailsContent = emailsBodyContentProfiling
      emailsInfo = emailsDataProfiling
      newRoute = "phase_2"
      break
    }

    case "phase_2": {
      emailsContent = emailsBodyContent
      emailsInfo = emailsData
      requireFeedback = true
      newRoute = "phase_3"
      break
    }

    case "phase_3": {
      emailsContent = emailsBodyContent
      emailsInfo = emailsData
      requireFeedback = false
      newRoute = "phase_0"
      break
    }

    default: {
      emailsContent = emailsBodyContentProfiling
      emailsInfo = emailsDataProfiling
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
        emailsContent={emailsContent}
        emailsInfo={emailsInfo}
        requireFeedback={requireFeedback}
      />
      <HandlePhasesNavigation route={response.route + '_emails'} />
    </Flex>
  )
}

export default EmailsPage