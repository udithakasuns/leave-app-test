import axios from 'axios';
import { API_BASE_URL } from 'src/configs';
import { axiosConfig } from 'src/utils/helpers/axiosApiUtil';

export const httpUserLoginApi = async () => {
    // console.log('Works');
    const apiConfig = await axiosConfig('accessToken');
    // eslint-disable-next-line no-console
    // console.log('API Config:', apiConfig);
    try {
        const res = await axios.get(
            `${API_BASE_URL}/v1/leaves/entitlements`,
            apiConfig,
        );
        // console.log('Res: ', res.data);
        return res.data;
    } catch (error) {
        // console.log('error : ', error.response);
    }

    // console.log('DATA :', res.data);
};

export const httpLeaveRequestApi = async () => {
    // console.log('Works');
    const apiConfig = await axiosConfig('accessToken');
    // eslint-disable-next-line no-console
    // console.log('API Config:', apiConfig);
    try {
        const res = await axios.get(`${API_BASE_URL}/v1/leaves`, apiConfig);
        // console.log('Res: ', res.data);
        return res.data.results;
    } catch (error) {
        // console.log('error : ', error.response);
    }

    // console.log('DATA :', res.data);
};
