import React, {useState } from 'react'
import { Checkbox } from "@/once-ui/components";

export const consent = [
    {
        id: "section1",
        title: undefined,
        section: "<b>Protocol Title</b>: Cybersecurity Training for End-users<br/>" +
            "<b>Principal Investigator</b>: Dr. Palvi Aggarwal<br/>" +
            "<b>UTEP Department</b>: Computer Science<br/>",
    },
    {
        id: "section2",
        title: undefined,
        section: "In this consent form, “you” always means the study subject. If you are a legally authorized " +
            "representative, please remember that “you” refers to the study subject.",
        color: "red"
    },
    {
        id: "section3",
        title: "Introduction",
        section: "You are being asked to take part voluntarily in the research project described below. You are " +
            "encouraged to take your time in making your decision. It is important that you read the information that " +
            "describes the study. Please ask the study researcher or the study staff to explain any words or information " +
            "that you do not clearly understand."
    },
    {
        id: "section4",
        title: "Why is this study being done?",
        section: "This task is part of a research study conducted by Dr. Palvi Aggarwal at University of Texas at El Paso. " +
            "The purpose of the research is to identify various factors that affect decisions in the cyber security domain in individuals and team setting. <br/>" +
            "Approximately, 100 participants, will be enrolling in this study through online website such Amazon Mechanical Turk. <br/>" +
            "You are being asked to be in the study because you are over the age of 18 years. <br/>" +
            "If you decide to enroll in this study, your involvement will last about between 30 to 60 minutes.<br/>",
    },
    {
        id: "section5",
        title: "What is involved in the study?",
        section: "During this study, you will engage in cybersecurity tasks both individually and as part of a team. " +
            "Additionally, we will request your demographic information, assess your personality traits, and administer " +
            "cybersecurity awareness and knowledge questionnaires. Your performance will be gauged based on points " +
            "accrued throughout the experiment. These points will subsequently be translated into your total earnings. " +
            "The cumulative points attained signify the rewards attributed to making precise decisions."
    },
    {
        id: "section6",
        title: "What are the risks and discomforts of the study?",
        section: "The risks associated with this research are no greater than those involved in daily activities. " +
            "There are no known or anticipated risks or discomforts associated with participation. "
    },
    {
        id: "section7",
        title: "Are there benefits to taking part in this study?",
        section: "You are not likely to benefit by taking part in this study, but the knowledge received may be of " +
            "value to humanity. This research may help us to understand various ways to design effective training " +
            "methods for cybersecurity. "
    },
    {
        id: "section8",
        title: "Who is paying for this study?",
        section: "The startup funds provided to Dr. Palvi Aggarwal by the UTEP Department of Computer Science will " +
            "offer financial support for conducting this study. "
    },
    {
        id: "section9",
        title: "What are my costs?",
        section: "There are no direct costs."
    },
    {
        id: "section10",
        title: "Will I be paid to participate in this study?",
        section: "You will receive a compensation of $8 per hour as a gift card for your participation in the study. " +
            "Furthermore, based on your performance within the study, you have the potential to earn an additional " +
            "sum ranging from $3 to $6 for the whole task. To be eligible for compensation, it's necessary to complete " +
            "the entire study, including the demographics survey, main task, and post-task questionnaire. Please note " +
            "that partial completion does not qualify for compensation. You will not be penalized if you choose to " +
            "withdraw from the study without completing it, but you will not be compensated either. There will be no " +
            "cost to you if you participate in this study."
    },
    {
        id: "section11",
        title: "What other options are there?",
        section: "You have the option not to take part in this study. If at any point you do not feel comfortable " +
            "with this or any other aspect of the study, you can stop at any time. There will be no penalties involved " +
            "if you choose not to take part in or withdraw from this study."
    },
    {
        id: "section12",
        title: "What if I want to withdraw, or am asked to withdraw from this study?",
        section: "Taking part in this study is voluntary. You have the right to choose not to take part in this study. " +
            "If you do not take part in the study, there will be no penalty or loss of benefit. If you choose to take " +
            "part, you have the right to skip any questions or stop at any time. "
    },
    {
        id: "section13",
        title: "Who do I call if I have questions or problems?",
        section: "You may ask any questions you have now. If you have questions later, you may email Dr. Palvi Aggarwal at paggarwal@utep.edu.<br/>" +
            "If you have questions or concerns about your participation as a research subject, please contact the UTEP " +
            "Institutional Review Board (IRB) at (915) -747-6590 or irb.orsp@utep.edu.<br/>"
    },
    {
        id: "section14",
        title: "What about confidentiality?",
        section: "Your part in this study is confidential. The following procedures will be followed to keep their " +
            "personal information confidential. The data captured for the research does not include any personally " +
            "identifiable information about you."
    },
    {
        id: "section15",
        title: "Authorization Statement",
        section: "I have read each page of this paper about the study (or it was read to me). I will be given a copy " +
            "of the form to keep. I know I can stop being in this study without penalty.  I know that being in this " +
            "study is voluntary and I choose to be in this study. "
    }
]

export function ConsentForm () {
    const [consented, setConsented] = useState({
        age: false,
        understood: false,
        participate: false
    })

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setConsented( (prev) => ({
            ...prev,
            [name]: checked }))
    }

    return (
        <>
            {consent.map((item) => (
                <div key={item.id}>
                    {<h2>{item.title}</h2>}
                    <br/>
                    <p dangerouslySetInnerHTML={{ __html: item.section }} style={{ color: item.color }}/>
                    <br/>
                    <hr/>
                </div>
            ))}

            <h2>Answer the following:</h2>
            <br/>
            <form>
                <Checkbox
                    label="I am age 18 or older"
                    description=""
                    iconButtonProps={{
                        onClick: handleCheckboxChange,
                    }}
                />
                <br/>
                <Checkbox
                    label="I have read and understand the information above"
                    description=""
                    iconButtonProps={{
                        onClick: handleCheckboxChange,
                    }}
                />
                <br/>
                <Checkbox
                    label="I want to participate in this research and continue with the study"
                    description=""
                    iconButtonProps={{
                        onClick: handleCheckboxChange,
                    }}
                />
            </form>
        </>
    )
}