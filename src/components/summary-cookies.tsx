"use client";
import Cookies from 'js-cookie';
//This component had to exist so that the cookie functionality could work on the Email Phases
const SummaryCookies = () => {
  return Cookies.get('userToken')
};

export default SummaryCookies;