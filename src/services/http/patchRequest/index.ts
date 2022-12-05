import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { ApplyFormValues } from 'src/utils/types';

export const postHttpApplyLeave = async (
    values: Omit<ApplyFormValues, 'entitlements' | 'requestDesc'>,
) => {
    const res = await axiosInstance.patch('/v1/leaves', values);
    return res.data.results;
};

export const patchHttpViewNotification = async (notificationId: string) => {
    const payload = {
        viewed: true,
    };
    const res = await axiosInstance.patch(
        `/v1/notifications/${notificationId}`,
        payload,
    );

    return res.data.results;
};
