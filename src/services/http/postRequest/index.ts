import axios from 'axios';
import { API_BASE_URL } from 'src/configs';
import { axiosConfig } from 'src/utils/helpers/axiosApiUtil';
import { ApplyFormValues } from 'src/utils/types';

export const postHttpApplyLeave = async (
    values: Omit<ApplyFormValues, 'entitlements'>,
) => {
    const apiConfig = await axiosConfig('accessToken');

    const res = await axios.post(
        `${API_BASE_URL}/v1/leaves`,
        values,
        apiConfig,
    );
    return res.data.results;
};
