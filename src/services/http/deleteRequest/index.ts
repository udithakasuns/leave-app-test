import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';

export const deleteHttpApplyLeave = async (requestId: number) => {
    const res = await axiosInstance.delete(`/v1/leaves/${requestId}`);
    return res.data.results;
};

export const deleteHttpNotificationDevice = async (deviceUniqueId: string) => {
    await axiosInstance.delete(`/v1/notifications/token/${deviceUniqueId}`);
};
