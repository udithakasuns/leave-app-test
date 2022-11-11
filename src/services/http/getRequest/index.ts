import axios from 'axios';
import { API_BASE_URL } from 'src/configs';
import { axiosConfig } from 'src/utils/helpers/axiosApiUtil';
import { LeaveRequestParams } from 'src/utils/types';

export const getHttpEntitlements = async () => {
    const apiConfig = await axiosConfig('accessToken');
    try {
        const res = await axios.get(
            `${API_BASE_URL}/v1/leaves/entitlements`,
            apiConfig,
        );
        return res.data.results;
    } catch (error) {
        return error;
    }
};

export const getHttpLeaveRequest = async (
    params?: Partial<LeaveRequestParams>,
) => {
    const apiConfig = await axiosConfig('accessToken', params);
    try {
        const res = await axios.get(`${API_BASE_URL}/v1/leaves`, apiConfig);
        return res.data.results;
    } catch (error) {
        return error;
    }
};

export const getHttpFilterTypes = async () => {
    const apiConfig = await axiosConfig('accessToken');
    try {
        const res = await axios.get(
            `${API_BASE_URL}/v1/leaves/types`,
            apiConfig,
        );
        return res.data.results;
    } catch (error) {
        return error;
    }
};
