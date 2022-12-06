import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { LeaveRequestParams } from 'src/utils/types';

export const getHttpEntitlements = async () => {
    const res = await axiosInstance.get('/v1/leaves/entitlements');
    return res.data.results;
};

export const getHttpEmployee = async () => {
    try {
        const res = await axiosInstance.get('/v1/employees/me');

        return res.data;
    } catch (err) {
        return err;
    }
};

export const getHttpRecipients = async () => {
    try {
        const res = await axiosInstance.get('/v1/employees/me/managers');

        return res.data;
    } catch (err) {
        return err;
    }
};

export const getHttpLeaveRequest = async (
    params?: Partial<LeaveRequestParams>,
) => {
    const res = await axiosInstance.get('/v1/leaves', { params });
    return res.data.results;
};

export const getHttpLeaveRequestByID = async (requestID: number) => {
    const res = await axiosInstance.get(`/v1/leaves/${requestID}`);
    return res.data.results;
};

export const getHttpPendingRequest = async (
    params?: Partial<LeaveRequestParams>,
) => {
    const res = await axiosInstance.get('/v1/managers/leaves', { params });
    return res.data.results;
};

export const getHttpPendingRequestByID = async (requestID: number) => {
    try {
        const res = await axiosInstance.get(`/v1/managers/leaves/${requestID}`);
        return res.data.results;
    } catch (err) {
        return err;
    }
};

export const getHttpFilterTypes = async (filterByInUse: boolean) => {
    const res = await axiosInstance.get('/v1/leaves/types', {
        params: { filterByInUse },
    });
    return res.data.results;
};
