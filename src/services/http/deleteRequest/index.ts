import { axiosInstance } from 'src/utils/helpers/axiosApiUtil';

export const deleteHttpApplyLeave = async (requestId: number) => {
    const res = await axiosInstance.delete(`/v1/leaves/${requestId}`);
    return res.data.results;
};
