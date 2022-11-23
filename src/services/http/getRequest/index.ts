import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';

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

export const getHttpLeaveRequest = async () => {
    const res = await axiosInstance.get('/v1/leaves');
    return res.data.results;
};

export const getHttpFilterTypes = async () => {
    const res = await axiosInstance.get('/v1/leaves/types', {
        params: { filterByInUse: true },
    });
    return res.data.results;
};
