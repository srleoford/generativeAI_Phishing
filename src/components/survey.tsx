'use client'
import 'survey-core/defaultV2.min.css';

import { Survey } from 'survey-react-ui';
import React from "react";
//import { Flex, Skeleton } from "@/once-ui/components";
import { Model } from "survey-core";
import { DefaultLight  } from "survey-core/themes";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loadPreviousAnswers } from '@/app/utils/cookies'
import { useEffect } from 'react';
import { insertSurveyData } from '@/app/utils/pinecone'


export default function SurveyForm() {

    const router = useRouter();
	/**
	 * 	Scores for profiling the user from the results
	 */
	const profileScores = {
		"Low Risk": 1,
		"Moderate Risk": 2,
		"High Risk": 3
	}
    
	/**
	 * 	The initial questions are grouped by category. Each category has an ID, title, and an array of questions.
	 * 		Each question has a question prompt ('questions'), answers ('options'), and response (for input from user)
	 */
     
    const surveyJson = {
  "title": "Profiling Survey",
  "pages": [
    {
      "name": "page1",
      "title": "Demographics",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question1",
          "title": "What is your age group?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "18-30"
            },
            {
              "value": "Item 2",
              "text": "31-50"
            },
            {
              "value": "Item 3",
              "text": "51-60"
            },
            {
              "value": "Item 4",
              "text": "61 or older"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question2",
          "title": "What is the highest level of education you have completed?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Less than high school"
            },
            {
              "value": "Item 2",
              "text": "High school diploma or equivalent"
            },
            {
              "value": "Item 3",
              "text": "Some college or associate degree"
            },
            {
              "value": "Item 4",
              "text": "Bachelor's degree"
            },
            {
              "value": "Item 5",
              "text": "Master's degree or higher"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question3",
          "title": "What is your current job title or field of work?",
          "isRequired": true,
          "showCommentArea": true,
          "commentText": "Other (specify) :",
          "choices": [
            {
              "value": "Item 1",
              "text": "IT professional (e.g., developer, engineer)"
            },
            {
              "value": "Item 2",
              "text": "Office worker (e.g., admin, sales, marketing)"
            },
            {
              "value": "Item 3",
              "text": "Non-technical work (e.g., manual labor, service industry)"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question4",
          "title": "How would you rate your proficiency in understanding and using the English language?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Native or fluent speaker"
            },
            {
              "value": "Item 2",
              "text": "Advanced proficiency (can read, write, and speak effectively"
            },
            {
              "value": "Item 3",
              "text": "Intermediate proficiency (can handle basic communication)"
            },
            {
              "value": "Item 4",
              "text": "Beginner proficiency (limited understanding of English)"
            },
            {
              "value": "Item 5",
              "text": "No proficiency (do not speak or understand English)"
            }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "title": "Technical Knowledge and Security Training",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question5",
          "title": "Do you frequently work with technology (e.g., email, cloud platform) ?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Daily"
            },
            {
              "value": "Item 2",
              "text": "Occasionally"
            },
            {
              "value": "Item 3",
              "text": "Rarely"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question6",
          "title": "How confident are you in your ability to identify phishing emails or scams?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Very confident (I have strong IT knowledge)"
            },
            {
              "value": "Item 2",
              "text": "Moderately confident (I can spot some scams)"
            },
            {
              "value": "Item 3",
              "text": "Not very confident (I rely on others to help)"
            },
            {
              "value": "Item 4",
              "text": "No confidence (I find it difficult to identify scams)"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question7",
          "title": "Have you received any cybersecurity or phishing awareness training in the last 12 months?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Multiple times (e.g., quarterly or biannual training)"
            },
            {
              "value": "Item 2",
              "text": "Once (annual training)"
            },
            {
              "value": "Item 3",
              "text": "I haven't received any training"
            }
          ]
        }
      ]
    },
    {
      "name": "page3",
      "title": "Social and Environmental Factors",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question8",
          "title": "How often do you use social media (e.g., Facebook, LinkedIn, Instagram)?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Daily"
            },
            {
              "value": "Item 2",
              "text": "A few times a week"
            },
            {
              "value": "Item 3",
              "text": "Rarely or never"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question9",
          "title": "Do you accept friend requests or connect with people you don't personally know on social media?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Yes, often"
            },
            {
              "value": "Item 2",
              "text": "Yes, occasionally"
            },
            {
              "value": "Item 3",
              "text": "No, never"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question10",
          "title": "Do you share personal or work-related information on your social media profiles?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Yes, frequently"
            },
            {
              "value": "Item 2",
              "text": "Yes, occasionally"
            },
            {
              "value": "Item 3",
              "text": "No, never"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question11",
          "title": "Does your organization conduct regular security training or simulated phishing attacks?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "Yes, frequently"
            },
            {
              "value": "Item 2",
              "text": "Yes, occasionally"
            },
            {
              "value": "Item 3",
              "text": "No, never"
            }
          ]
        }
      ]
    },
    {
      "name": "page4",
      "title": "Emotional/Cognitive Bias",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question12",
          "title": "How do you typically respond to urgent emails requesting immediate action (e.g., account lockout, payment issues)?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "I always verify the request before responding"
            },
            {
              "value": "Item 2",
              "text": "I sometimes respond quickly without verification"
            },
            {
              "value": "Item 3",
              "text": "I usually act immediately if the email looks legitimate"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question13",
          "title": "Are you more likely to trust emails from senior management or authorities without question?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "No, I always verify emails from authorities"
            },
            {
              "value": "Item 2",
              "text": "Sometimes, but I try to check for authenticity"
            },
            {
              "value": "Item 3",
              "text": "Yes, I usually trust emails from senior management or authorities"
            }
          ]
        },
        {
          "type": "radiogroup",
          "name": "question14",
          "title": "How do you respond to unexpected rewards or offers (e.g., winning a prize, getting a free service)?",
          "isRequired": true,
          "choices": [
            {
              "value": "Item 1",
              "text": "I always ignore such offers"
            },
            {
              "value": "Item 2",
              "text": "I sometimes check them out before ignoring"
            },
            {
              "value": "Item 3",
              "text": "I'm often curious and explore the offer"
            }
          ]
        }
      ]
    }
  ],
  "showPrevButton": false,
  "requiredText": "(*)",
  "questionStartIndex": "1"
};
    
  const survey = new Model(surveyJson);
  survey.applyTheme(DefaultLight);

  useEffect(() => {
          loadPreviousAnswers(survey)
    }, []);

  survey.onCurrentPageChanged.add(function (sender, options) {
      Cookies.set('surveyAnswers',JSON.stringify(sender.data))
      console.log(Cookies.get('surveyAnswers'))
  });

  survey.onComplete.add(function (sender, options) {

    console.log(sender.data)
    // Display the "Saving..." message (pass a string value to display a custom message)
    options.showSaveInProgress();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xhr.onload = xhr.onerror = function () {
      if (xhr.status == 200) {
        //options.showSaveSuccess();
        Cookies.set("surveySubmitted","true")

        const selectedChoicesText = {};

        survey.getAllQuestions().forEach((question) => {
          // Only process questions with choices (checkbox, radiogroup, dropdown)
          if (question.choices && question.value) {
            const selectedValues = Array.isArray(question.value) ? question.value : [question.value];

            // Map selected values to their corresponding text
            const texts = selectedValues.map(value => {
              const choice = question.choices.find(choice => choice.value === value);
              return choice ? choice.text : value;
            });

            // If only one choice was selected, store as a string; otherwise, store as an array
            selectedChoicesText[question.name] = texts.length === 1 ? texts[0] : texts;
          }
        });

        console.log(JSON.stringify(selectedChoicesText));
        insertSurveyData(JSON.stringify(selectedChoicesText), Cookies.get('email'), Cookies.get('userToken'))
        router.push("/instructions");
      } else {
        // Display the "Error" message (pass a string value to display a custom message)
        options.showSaveError();
      }
  };
  xhr.send(JSON.stringify(sender.data));
});

  return <Survey model={survey} />;
}