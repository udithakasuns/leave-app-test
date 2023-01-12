import crashlytics from '@react-native-firebase/crashlytics';
import { DEPLOYMENT_ENV } from 'src/configs';
import getAppVersion from './getAppVersion';

/* Crash analytics will not be working in debug mode since it disbled in firebase.json file */
export const setCrashlyticsLogs = (email: string) => {
    crashlytics().setAttribute('User Email', email);
    crashlytics().setAttribute('Deployment Environment', DEPLOYMENT_ENV);
    crashlytics().setAttribute('App Version', getAppVersion());
};
