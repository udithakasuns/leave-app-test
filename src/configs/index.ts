/* eslint-disable @typescript-eslint/no-shadow */
export type DeploymentEnv = 'STG' | 'QA' | 'PROD';
export type Config = {
    apiBaseUrl: string;
    webBaseUrl: string;
    codePushDeploymentKeyAndroid: string /* If you update this key you need to update in android/app/build.gralde file as well */;
    codePushDeploymentKeyIOS: string /* If you update this key you need to update in ios/rtc_leave_app/build_settings/CODEPUSH_KEY file as well */;
};

export const DEPLOYMENT_ENV: DeploymentEnv = 'STG'; // Please change only this value when you are going to deploy

const getCofig = (env: DeploymentEnv): Config => {
    // staging config set as default
    if (env === 'PROD') {
        return {
            apiBaseUrl: 'https://api.rootcode.myleave.io',
            webBaseUrl: 'https://rootcode.myleave.io',
            codePushDeploymentKeyAndroid:
                'HLY-jQoQqNNzU8LR-a9IyLoa7zUeC_Mmx4Zq-',
            codePushDeploymentKeyIOS: '6s6ITQbaSiHDri4iWsay7Yd5h0mxn9j9jG6-Z',
        };
    }
    if (env === 'QA') {
        return {
            apiBaseUrl: 'https://qa-api.myleave.rootcode.software',
            webBaseUrl: 'https://qa.myleave.rootcode.software',
            codePushDeploymentKeyAndroid:
                'BsPX5NQculfTeErzU7E2XmBEtwXBfmJrJ1Nta',
            codePushDeploymentKeyIOS: 'r6u0Vp1YG_8XRbwQy-2binA1yEmo5aYypYNTl',
        };
    }
    // STG
    return {
        apiBaseUrl: 'https://stage-api.leaveapp.rootcode.software',
        webBaseUrl: 'https://leaveapplication.rootcode.software',
        codePushDeploymentKeyAndroid: 'oXlAvLeGXzGHw4cn4F6sGEgd3UAOXSpu3rZc_',
        codePushDeploymentKeyIOS: 'P6qN6-Dql-q_NiOGPO3Etz_nCOZ2bVW6sm3nn',
    };
};

const {
    apiBaseUrl,
    webBaseUrl,
    codePushDeploymentKeyAndroid,
    codePushDeploymentKeyIOS,
} = getCofig(DEPLOYMENT_ENV);

export const API_BASE_URL = apiBaseUrl;
export const SUPPORT_URL = `${webBaseUrl}/support/questions`;
export const PRIVACY_POLICY_URL = `${webBaseUrl}/support/privacy-policy`;
export const CODEPUSH_DEPLOYMENT_KEY_ANDROID = codePushDeploymentKeyAndroid;
export const CODEPUSH_DEPLOYMENT_KEY_IOS = codePushDeploymentKeyIOS;
