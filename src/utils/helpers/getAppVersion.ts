import DeviceInfo from 'react-native-device-info';
import { deploymentEnv } from 'src/configs';

const getAppVersion = () => {
    const env = deploymentEnv.toLocaleLowerCase();
    return `${env} v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`;
};

export default getAppVersion;
