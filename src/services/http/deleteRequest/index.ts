import axios from 'axios';
import { API_BASE_URL } from 'src/configs';
import { axiosConfig } from 'src/utils/helpers/axiosApiUtil';

export const deleteHttpApplyLeave = async (requestId: number) => {
    const apiConfig = await axiosConfig('accessToken');

    const res = await axios.delete(
        `${API_BASE_URL}/v1/leaves/${requestId}`,
        apiConfig,
    );
    return res.data.results;
};
