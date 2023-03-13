import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { LeaveRequestParams, NotificationVisibleType } from 'src/utils/types';

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
    return res.data.results[0];
};

export const getHttpLeaveRequestByID = async (requestID: number) => {
    const res = await axiosInstance.get(`/v1/leaves/${requestID}`);
    return res.data.results;
};

export const getHttpPendingRequest = async (
    params?: Partial<LeaveRequestParams>,
) => {
    const res = await axiosInstance.get('/v1/managers/leaves', { params });
    return res.data.results[0];
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

export const getHttpNotificationCount = async (
    userRole: 'MANAGER' | 'EMPLOYEE' = 'MANAGER',
) => {
    const res = await axiosInstance.get(
        `/v1/notifications/count?viewed=false&userRole=${userRole}`,
    );
    return res;
};

export const getHttpNotifications = async (
    page = 0,
    size = 10,
    userRole: 'MANAGER' | 'EMPLOYEE' = 'EMPLOYEE',
    viewType: NotificationVisibleType = 'all',
) => {
    let url = `v1/notifications?page=${page}&size=${size}&UserRole=${userRole}&sortOrder=DESC&sortKey=createdDate`;
    if (viewType === 'unread') {
        url = `v1/notifications?page=${page}&size=${size}&UserRole=${userRole}&isViewed=${false}&sortOrder=DESC&sortKey=createdDate`;
    }
    const res = await axiosInstance.get(url);
    return res.data.results[0];
};

export const getHttpNudgeVisibility = async (requestID: number) => {
    const res = await axiosInstance.get(`/v1/notifications/nudge/${requestID}`);
    return res.data.results;
};

export const getHttpMe = async () => {
    const res = await axiosInstance.get('/v1/users/me');
    return res.data.results[0];
};

export const getHttpTeamAvailability = async ({
    date,
    teamIds,
}: {
    date?: string /* 2023-01-10 */;
    teamIds?: number[];
}) => {
    let url = '/v1/managers/onleave';
    if (teamIds && date) url = `${url}?date=${date}&teamIds=${teamIds}`;
    else if (date) url = `${url}?date=${date}`;
    else if (teamIds) url = `${url}?teamIds=${teamIds}`;
    const res = await axiosInstance.get(url);
    return res.data.results[0];
};

export const getHttpAwayEmployees = async ({
    teamId,
    startDate,
    endDate,
}: {
    teamId: number;
    startDate: string;
    endDate: string;
}) => {
    const res = await axiosInstance.get(
        `/v1/admin/onleave-detailed?startDate=${startDate}&endDate=${endDate}&teamId=${teamId}`,
    );
    return res.data.results[0];
};

export const getHttpTeamByUser = async (userId: string) => {
    const res = await axiosInstance.get(`/v1/employees/teams/${userId}`);
    return res.data.results;
};
