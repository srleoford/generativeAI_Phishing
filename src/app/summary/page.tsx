import React from 'react';
// import Cookies from "js-cookie";
import { getAnswers } from '../utils/pinecone';

export interface BlockResults {
    correct: number;
    incorrect: number;
    feedback: string;
    time: number;
}

interface SummaryPageProps {
    block1: BlockResults;
    block2: BlockResults;
}

// const token = Cookies.get("token")
const token: string = "cnViZW42MjE5OTgucmViZ0BnbWFpbC5jb21iODVkOTg4YjViM2YwYjFkOWFkMTEwMmMwNDE5YWRlZA=="

const mocks = [
    {
      emailId: 1,
      interactions: {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
      }
    },
    {
      emailId: 2,
      interactions: {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
      }
    },
    {
      emailId: 3,
      interactions: {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
      }
    },
    {
      emailId: 4,
      interactions: {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
      }
    },
    {
      emailId: 5,
      interactions: {
        mouseHoverOverLinks: false,
        clickingBehavior: false,
        timeSpent: 0,
        senderInteraction: false,
        openingAttachments: false,
        isCorrect: undefined
      }
    }
  ]

const block1: BlockResults = {
    correct: 0,
    incorrect: 0,
    feedback: "Block 1 feedback",
    time: 0
};

const block2: BlockResults = {
    correct: 0,
    incorrect: 0,
    feedback: "Block 2 feedback",
    time: 0
};

const SummaryPage = async () => {
    const answers = await getAnswers(token)
    console.log(answers)
    const totalCorrect = block1.correct + block2.correct;
    const totalIncorrect = block1.incorrect + block2.incorrect;
    const totalTime = block1.time + block2.time;

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
                <p>Total Correct: {totalCorrect}</p>
                <p>Total Incorrect: {totalIncorrect}</p>
                <p>Total Time Elapsed: {totalTime}</p>
            </div>
        </div>
    );
};

export default SummaryPage;