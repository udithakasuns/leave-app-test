import DeviceInfo from 'react-native-device-info';
import { DEPLOYMENT_ENV } from 'src/configs';

const getAppVersion = () => {
    const env = DEPLOYMENT_ENV.toLocaleLowerCase();
    const version = `v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`;

    if (DEPLOYMENT_ENV === 'PROD') {
        return version;
    }
    return `${env} ${version}`;
};

export default getAppVersion;
