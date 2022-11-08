import { getUserTokenByType } from 'src/services/local';
import { UserTokenType } from '../types';

interface AxiosConfigProps {
    headers: {
        Authorization: string;
    };
}

export const axiosConfig = async (
    tokenType: UserTokenType,
): Promise<AxiosConfigProps> => {
    const token = await getUserTokenByType(tokenType);
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
