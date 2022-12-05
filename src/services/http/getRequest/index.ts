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

export const getHttpLeaveRequest = async (
    params?: Partial<LeaveRequestParams>,
) => {
    const res = await axiosInstance.get('/v1/leaves', { params });
    return res.data.results;
};

export const getHttpFilterTypes = async () => {
    const res = await axiosInstance.get('/v1/leaves/types', {
        params: { filterByInUse: true },
    });
    return res.data.results;
};

export const getHttpNotificationCount = async () => {
    const res = await axiosInstance.get('v1/notifications/count');
    return res;
};

export const getHttpNotifications = async (
    page = 0,
    size = 10,
    userRole: 'MANAGER' | 'EMPLOYEE' = 'EMPLOYEE',
    isViewed = false,
) => {
    const res = await axiosInstance.get(
        `v1/notifications?page=${page}&size=${size}&UserRole=${userRole}&isViewed=${isViewed}`,
    );
    return res.data.results[0];
};
