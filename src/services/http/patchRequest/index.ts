import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { LeaveUndoProp, UpdateManagerRequest } from 'src/utils/types';

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
