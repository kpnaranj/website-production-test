//import the similar settings from next.config.js
import getConfig from 'next/config';

//set a variable to be used 

const {publicRuntimeConfig} = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? 'http://seoblog.com' : 'http://localhost:5000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;

