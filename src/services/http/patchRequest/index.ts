import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import {
    EmployeeNotificationSettings,
    LeaveUndoProp,
    ManagerNotificationSettings,
    UpdateManagerRequest,
} from 'src/utils/types';

export const patchHttpApplyLeave = async (values: Partial<LeaveUndoProp>) => {
    const res = await axiosInstance.patch(`/v1/leaves/${values.requestID}`, {
        leaveRequestStatus: values.leaveRequestStatus,
    });
    return res.data.results;
};

export const patchHttpManagerLeave = async (
    values: Partial<UpdateManagerRequest>,
) => {
    const res = await axiosInstance.patch(
        `/v1/managers/leaves/${values.requestID}`,
        {
            status: values.status,
            reviewerComment: values.reviewerComment,
        },
    );
    return { result: res.data.results, previousStatus: values.previousStatus };
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

export const patchHttpEmployeeSettings = async ({
    isLeaveRequestNotificationsEnabled,
    isUpcomingEventsNotificationsEnabled,
}: EmployeeNotificationSettings) => {
    const payload = {
        notificationSettings: {
            isLeaveRequestNotificationsEnabled,
            isUpcomingEventsNotificationsEnabled,
        },
    };
    const res = await axiosInstance.patch('/v1/users/me/settings', payload);
    return res.data.results;
};

export const patchHttpManagerSettings = async ({
    isLeaveRequestNotificationsEnabled,
    isUpcomingEventsNotificationsEnabled,
    isNudgeNotificationsEnabled,
}: ManagerNotificationSettings) => {
    const payload = {
        notificationSettings: {
            isLeaveRequestNotificationsEnabled,
            isUpcomingEventsNotificationsEnabled,
            isNudgeNotificationsEnabled,
        },
    };
    const res = await axiosInstance.patch(
        '/v1/users/me/settings/manager',
        payload,
    );
    return res.data.results;
};
