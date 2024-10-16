'use client'

import { Button, Flex } from '@/once-ui/components'
import React, { useState } from 'react'
import SurveyForm from './survey'
import Link from 'next/link'

const SurveyContainer = () => {
    const [isEndSurvey, setEndSurvey] = useState(false)
    return (
        <Flex
        direction='column'
        gap='m'
        alignItems='center'>
            <SurveyForm/>
            
        </Flex>
    )
}

export default SurveyContainer