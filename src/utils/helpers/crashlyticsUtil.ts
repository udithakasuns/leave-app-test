/* eslint-disable import/no-extraneous-dependencies */
import crashlytics from '@react-native-firebase/crashlytics';
import { DEPLOYMENT_ENV } from 'src/configs';
import AppCenterAnalytics from 'appcenter-analytics';
import getAppVersion from './getAppVersion';

/* Crash analytics will not be working in debug mode since it disbled in firebase.json file */
export const setCrashlyticsLogs = (email: string) => {
    crashlytics().setAttribute('User Email', email);
    crashlytics().setAttribute('Deployment Environment', DEPLOYMENT_ENV);
    crashlytics().setAttribute('App Version', getAppVersion());
};

export const setAppCenterAnalyticsLogs = (email: string) => {
    AppCenterAnalytics.trackEvent('Tracking User', {
        UserEmail: email,
        DeploymentEnv: DEPLOYMENT_ENV,
        AppVersion: getAppVersion(),
    });
};
