import React from 'react';
import Cookies from "js-cookie";
import { getAnswers } from '../utils/pinecone';
import { Heading, Text, Flex, Button, Grid, Icon, InlineCode, Logo, Background, RevealFx, Skeleton } from '@/once-ui/components';
import { mocks } from '../lib/mockResults';

export interface BlockResults {
    correct: number;
    incorrect: number;
    feedback: string;
    clickingBehavior: boolean;
    time: number;
}

interface SummaryPageProps {
    block1: BlockResults;
    block2: BlockResults;
}

// const token = Cookies.get("token")
const token: string = "cnViZW42MjE5OTgucmViZ0BnbWFpbC5jb21iODVkOTg4YjViM2YwYjFkOWFkMTEwMmMwNDE5YWRlZA=="


const block1: BlockResults = {
    correct: 0,
    incorrect: 0,
    clickingBehavior: mocks[0].interactions.clickingBehavior,
    feedback: "Block 1 feedback",
    time: 0
};

const block2: BlockResults = {
    correct: 0,
    incorrect: 0,
    clickingBehavior: mocks[1].interactions.clickingBehavior,
    feedback: "Block 2 feedback",
    time: 0
};

const block3: BlockResults = {
    correct: 0,
    incorrect: 0,
    clickingBehavior: mocks[2].interactions.clickingBehavior,
    feedback: "Block 3 feedback",
    time: 0
};

/*
Classification results in different phase (pre-training, training and post training) and if possible then also block wise in training. 
Time spent phase wise.
Performance against specific persuasion strategy.  
Performance statistics, such as clicks, time per email, etc.
Showing the results using the graphs is a good idea. Let mw know if you have any other questions.
*/

const SummaryPage = async () => {
    const answers = await getAnswers(token)
    console.log(answers)
    const totalCorrect = block1.correct + block2.correct;
    const totalIncorrect = block1.incorrect + block2.incorrect;
    const phase1correct = block1.correct;
    const phase2correct = block2.correct;
    const phase3correct = block3.correct;
    const phase1clicks = block1.clickingBehavior;
    const phase2clicks = block2.clickingBehavior;
    const phase3clicks = block3.clickingBehavior;
    const phase1Time = block1.time;
    const phase2Time = block2.time;
    const phase3Time = block3.time;
    const totalTime = block1.time + block2.time + block3.time; 
    // How can we get specific persuasion strategy scores for each user?
    const timeperEmail = totalTime / 5;


    return (
        <div>
            <h1>Test Summary</h1>
            <div>
                <h2>Block 1</h2>
                <p>Test: {mocks[0].interactions.timeSpent}</p>
                <p>Correct: {block1.correct}</p>
                <p>Incorrect: {block1.incorrect}</p>
                <p>Feedback: {block1.feedback}</p>
            </div>
            <div>
                <h2>Block 2</h2>
                <p>Correct: {block2.correct}</p>
                <p>Incorrect: {block2.incorrect}</p>
                <p>Feedback: {block2.feedback}</p>
            </div>
            <div>
                <h2>Total</h2>
                <p>Correct: {totalCorrect}</p>
                <p>Incorrect: {totalIncorrect}</p>
            </div>
            <div>
                <h2>Summary</h2>
                {/* <p>Answers: {answers[0].interactions.timeSpent}</p> */}
                <p>Total Correct: {totalCorrect}</p>
                <p>Total Incorrect: {totalIncorrect}</p>
                <p>Total Time Elapsed: {totalTime}</p>
            </div>
          
        </div>
    );
};

export default SummaryPage;