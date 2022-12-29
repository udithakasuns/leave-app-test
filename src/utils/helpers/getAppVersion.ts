import DeviceInfo from 'react-native-device-info';
import { DEPLOYMENT_ENV } from 'src/configs';

const getAppVersion = () => {
    const env = DEPLOYMENT_ENV.toLocaleLowerCase();
    return `${env} v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`;
};

export default getAppVersion;
