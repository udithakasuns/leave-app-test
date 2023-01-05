import DeviceInfo from 'react-native-device-info';
import { DEPLOYMENT_ENV } from 'src/configs';

const getAppVersion = () => {
    const version = `v${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`;

    if (DEPLOYMENT_ENV === 'PROD') {
        return version;
    }
    return `${DEPLOYMENT_ENV} ${version}`;
};

export default getAppVersion;
