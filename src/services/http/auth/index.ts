import axios from 'axios';
import { API_BASE_URL } from 'src/configs';
import { axiosConfig } from 'src/utils/helpers/axiosApiUtil';

export const httpUserLoginApi = async () => {
    const apiConfig = await axiosConfig('accessToken');
    try {
        const res = await axios.get(`${API_BASE_URL}/v1//users/me`, apiConfig);
        return res.data;
    } catch (error) {
        return error;
    }
};
