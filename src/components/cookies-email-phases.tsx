"use client";

import { handleNavigation } from '@/app/utils/cookies';
//This component had to exist so that the cookie functionality could work on the Email Phases
const HandlePhasesNavigation = ({ route }) => {
  handleNavigation(route);
  return null;
};

export default HandlePhasesNavigation;