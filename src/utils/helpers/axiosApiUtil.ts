import { localGetUserTokenByType } from 'src/services/local';
import { UserTokenType } from '../types';

interface AxiosConfigProps {
    headers: {
        Authorization: string;
    };
    params: any;
}

export const axiosConfig = async (
    tokenType: UserTokenType,
    params?: any,
): Promise<AxiosConfigProps> => {
    const token = await localGetUserTokenByType(tokenType);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params,
    };
};
