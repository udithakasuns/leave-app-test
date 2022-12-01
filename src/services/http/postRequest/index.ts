import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { ApplyFormValues, DeviceType } from 'src/utils/types';

export const postHttpApplyLeave = async (
    values: Omit<ApplyFormValues, 'entitlements'>,
) => {
    const res = await axiosInstance.post('/v1/leaves', values);
    return res.data.results;
};

export const postHttpNudge = async () => {
    const res = await axiosInstance.post('/v1/notifications/nudge/1', {});
    return res;
};

export const postHttpNotificationRegister = async (
    deviceToken: string,
    deviceType: DeviceType,
): Promise<boolean> => {
    const payload = {
        deviceToken,
        deviceType,
    };
    try {
        await axiosInstance.post('/v1/notifications/register-device', payload);
        return true;
    } catch (error) {
        return false;
    }
};
