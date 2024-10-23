"use client"
import { Background, Flex } from '@/once-ui/components'
import React from 'react'
import emailsBodyContentProfiling from './mocks/emailsContentProfiling.json'
import emailsDataProfiling from './mocks/emailsInfoProfiling.json'
import emailsBodyContent from './mocks/emailsContent.json'
import emailsData from './mocks/emailsInfo.json'
// import { PreventNavigation } from '@/components/PreventNavigation'
import { ResponseRoute } from '../api/phases/route'
import EmailContainer from './_components/EmailContainer'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const EmailsPage = async () => {
  //If the token does not exist or
  //If the survey has not been submitted
  //It will redirect to consent form
  const token = Cookies.get('userToken');
  const surveySubmitted = Cookies.get("surveySubmitted");
  console.log(token);
  console.log(surveySubmitted);
  if (!token || !surveySubmitted)
  {
    const router = useRouter(); 
    router.push("/")
  }

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
    </Flex>
  )
}

export default EmailsPage