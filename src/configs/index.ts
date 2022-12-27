/* eslint-disable @typescript-eslint/no-shadow */
export type DeploymentEnv = 'STG' | 'QA' | 'PROD';

export const deploymentEnv: DeploymentEnv = 'STG';

const getBaseUrl = (env: DeploymentEnv): string => {
    if (env === 'PROD') {
        return 'https://api.rootcode.myleave.io';
    }
    if (env === 'QA') {
        return 'https://qa-api.myleave.rootcode.software';
    }
    return 'https://stage-api.leaveapp.rootcode.software';
};

export const API_BASE_URL = getBaseUrl(deploymentEnv);
