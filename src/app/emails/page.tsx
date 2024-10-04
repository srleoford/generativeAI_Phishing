import { Background, Flex } from '@/once-ui/components'
import React from 'react'
import SideBar from './_components/sidebar/SideBar'
import Email from './_components/EmailContainer'

const EmailsPage = () => {
  return (
    <Flex
        fillWidth
        fillHeight
        padding='l'
        direction='row'
        gap='xs'
        alignItems="center" flex={1}
    >
        <Background
            position='absolute'
			dots={false}/>

        <SideBar/>  

        <Email/>
    </Flex>
  )
}

export default EmailsPage