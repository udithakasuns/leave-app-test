/* eslint-disable no-param-reassign */
import { localGetUserTokenByType } from 'src/services/local';
import axios from 'axios';
import { awsGetNewAccessToken } from 'src/services/aws';
import { API_BASE_URL } from 'src/configs';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async config => {
        const accessToken = await localGetUserTokenByType('accessToken');
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        return config;
    },
    error => {
        Promise.reject(error);
    },
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            const newAccessToken = await awsGetNewAccessToken();
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    },
);

export { axiosInstance };
