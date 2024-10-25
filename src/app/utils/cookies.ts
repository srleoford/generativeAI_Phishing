'use client'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const setRegisterCookies = (state) =>{
    const router = useRouter(); 
    const messageContent = state?.message || "";
    //If a user is inserted successfully, sets up the userToken cookie and initializes the others
    //It extracts the token from the success message, this could change if message is modified
    useEffect(() => {
        if (messageContent) {
            Cookies.remove('userToken'); 
            Cookies.set('surveySubmitted', 'false');
            Cookies.set('phase_1','not_started')
            Cookies.set('phase_2','not_started')
            Cookies.set('phase_3','not_started')
            const token = messageContent.split(" ").pop();
            Cookies.set('userToken', token); 
            router.push('/intro');
        }
      }, [messageContent, state?.isSuccess, router]);
}

export const handleNavigation =  (page: string) => {
    if (typeof window !== 'undefined'){
        const router = useRouter(); 
        const phase_1_status = Cookies.get('phase_1')
        const phase_2_status = Cookies.get('phase_2')
        const phase_3_status = Cookies.get('phase_3')
        const token = Cookies.get('userToken');
        const surveySubmitted = Cookies.get("surveySubmitted");
        //Just for debugging
        console.log(
            `Phase 1 Status: ${phase_1_status}`,
            `Phase 2 Status: ${phase_2_status}`,
            `Phase 3 Status: ${phase_3_status}`,
            `User Token: ${token}`,
            `Survey Submitted: ${surveySubmitted}`,
            `Page: ${page}`
        );
    
        switch(page)
        {
            case 'consent':
                //Removes all cookies and sets the Email Phase back to 1
                Cookies.remove('userToken'); 
                Cookies.set('surveySubmitted', 'false');
                Cookies.set('phase_1','not_started')
                Cookies.set('phase_2','not_started')
                Cookies.set('phase_3','not_started')
    
                const postData = {
                    newRoute: "phase_1"
                }
                
                fetch(
                    'http://localhost:3000/api/phases',
                    {
                      method: 'POST',
                      body: JSON.stringify(postData),
                      cache: 'no-store'
                    }
                )
            break;
    
            case 'survey':
                //Gets the cookie containing the token, if it can't find it it will redirect to consent form
                //If the form has already been submitted, it will redirect to consent form
                console.log(token);
                if (!token || surveySubmitted === "true")
                {
                    router.push("/")
                }
            break;
            
            case 'phase_1_instructions':
                //Checks if navigation happened
                if (!token || surveySubmitted === "false" || phase_1_status != 'not_started'
                || phase_2_status != 'not_started' || phase_3_status != 'not_started'){

                    //If enters this block it means they did not refresh the page, instead they pressed the back/forward buttons or typed the address directly
                    if (!(token && surveySubmitted === "true" && phase_1_status == 'started'
                        && phase_2_status == 'not_started' && phase_3_status == 'not_started')) {
                        
                        router.push("/")
                    }
                }
                else {
                    //They entered this page when they should and it is the first time they see it
                    Cookies.set('phase_1','started')
                }
            break;
    
            case 'phase_2_instructions':
                //Checks if navigation happened
                if (!token || surveySubmitted === "false" || phase_1_status != 'completed'
                || phase_2_status != 'not_started' || phase_3_status != 'not_started'){

                    //If enters this block it means they did not refresh the page, instead they pressed the back/forward buttons or typed the address directly
                    if (!(token && surveySubmitted === "true" && phase_1_status == 'completed'
                        && phase_2_status == 'started' && phase_3_status == 'not_started')) {
                        
                        router.push("/")
                    }
                }
                else {
                    //They entered this page when they should and it is the first time they see it
                    Cookies.set('phase_2','started')
                }
            break;
    
            case 'phase_3_instructions':
                //Checks if navigation happened
                if (!token || surveySubmitted === "false" || phase_1_status != 'completed'
                || phase_2_status != 'completed' || phase_3_status != 'not_started'){

                    //If enters this block it means they did not refresh the page, instead they pressed the back/forward buttons or typed the address directly
                    if (!(token && surveySubmitted === "true" && phase_1_status == 'completed'
                        && phase_2_status == 'completed' && phase_3_status == 'started')) {
                        
                        router.push("/")
                    }
                }
                else {
                    //They entered this page when they should and it is the first time they see it
                    Cookies.set('phase_3','started')
                }
            break;
    
            case 'phase_1_emails':
            //Phase 1 has to be started in order to classify emails
                if (!token || surveySubmitted === false || phase_1_status != 'started'
                || phase_2_status != 'not_started' || phase_3_status != 'not_started'){
                    router.push("/")
                    break
                }
            break;
    
            case 'phase_2_emails':
            //Phase 1 must be completed, phase 2 must be started and phase 3 not started
                if (!token || surveySubmitted === false || phase_1_status != 'completed'
                || phase_2_status != 'started' || phase_3_status != 'not_started'){
                    router.push("/")
                    break
                }
            break;
    
            case 'phase_3_emails':
            //Phase 1 must be completed, phase 2 must be completed and phase 3 started
                if (!token || surveySubmitted === false || phase_1_status != 'completed'
                || phase_2_status != 'completed' || phase_3_status != 'started'){
                    router.push("/")
                    break
                }
            break;
        }
    }

}

export const setCompletedCookie = () => {
    const phase_1_status = Cookies.get('phase_1')
    const phase_2_status = Cookies.get('phase_2')
    const phase_3_status = Cookies.get('phase_3')

    if (phase_1_status == 'started'){
        Cookies.set('phase_1','completed')
    }
    if (phase_2_status == 'started'){
        Cookies.set('phase_2','completed')
    }
    if (phase_3_status == 'started'){
        Cookies.set('phase_3','completed')
    }
}