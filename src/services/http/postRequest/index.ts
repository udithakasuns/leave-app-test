import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { ApplyFormValues } from 'src/utils/types';

export const postHttpApplyLeave = async (
    values: Omit<ApplyFormValues, 'entitlements'>,
) => {
    const res = await axiosInstance.post('/v1/leaves', values);
    return res.data.results;
};

export const postHttpNudge = async (requiredId: number) => {
    const res = await axiosInstance.post(
        `/v1/notifications/nudge/${requiredId}`,
        {},
    );
    return res;
};
