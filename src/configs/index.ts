/* eslint-disable @typescript-eslint/no-shadow */
export type DeploymentEnv = 'STG' | 'QA' | 'PROD';
export type Config = {
    apiBaseUrl: string;
    webBaseUrl: string;
};

export const DEPLOYMENT_ENV: DeploymentEnv = 'PROD'; // Please change only this value when you are going to deploy

const getCofig = (env: DeploymentEnv): Config => {
    // staging config set as default
    if (env === 'PROD') {
        return {
            apiBaseUrl: 'https://api.rootcode.myleave.io',
            webBaseUrl: 'https://rootcode.myleave.io',
        };
    }
    if (env === 'QA') {
        return {
            apiBaseUrl: 'https://qa-api.myleave.rootcode.software',
            webBaseUrl: 'https://qa.myleave.rootcode.software',
        };
    }
    // STG
    return {
        apiBaseUrl: 'https://stage-api.leaveapp.rootcode.software',
        webBaseUrl: 'https://leaveapplication.rootcode.software',
    };
};

const { apiBaseUrl, webBaseUrl } = getCofig(DEPLOYMENT_ENV);

export const API_BASE_URL = apiBaseUrl;
export const SUPPORT_URL = `${webBaseUrl}/support/questions`;
export const PRIVACY_POLICY_URL = `${webBaseUrl}/support/privacy-policy`;
