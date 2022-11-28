import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';
import { LeaveUndoProp } from 'src/utils/types';

export const patchHttpApplyLeave = async (values: Partial<LeaveUndoProp>) => {
    const res = await axiosInstance.patch('/v1/leaves', values);
    return res.data.results;
};
