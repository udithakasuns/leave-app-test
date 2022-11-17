/* eslint-disable no-console */
import EncryptedStorage from 'react-native-encrypted-storage';
import { UserTokens, UserTokenType } from 'utils/types';

const keys = {
    USER_TOKENS: 'USER_TOKENS',
};

export const localSaveUserTokens = async ({
    idToken,
    accessToken,
    refreshToken,
}: UserTokens) => {
    try {
        await EncryptedStorage.setItem(
            keys.USER_TOKENS,
            JSON.stringify({
                idToken,
                accessToken,
                refreshToken,
            }),
        );
    } catch (error) {
        console.log('User Tokens not saved to encrypted storage: ', error);
    }
};

export const localGetUserTokenByType = async (
    tokenType: UserTokenType,
): Promise<string> => {
    try {
        const userTokens = await EncryptedStorage.getItem(keys.USER_TOKENS);
        if (userTokens) {
            const tokens = JSON.parse(userTokens);
            return tokens[tokenType];
        }
        console.log('User tokens undefined');
        return '';
    } catch (error) {
        console.log('User Token cannot get from encrypted storage: ', error);
        return '';
    }
};

export const localGetAllUserTokens = async (): Promise<{
    idToken: string;
    accessToken: string;
    refreshToken: string;
} | null> => {
    try {
        const userTokens = await EncryptedStorage.getItem(keys.USER_TOKENS);
        if (userTokens) {
            const tokens = JSON.parse(userTokens);
            return tokens;
        }
        console.log('User tokens undefined');
        return null;
    } catch (error) {
        console.log(
            'All User Token cannot get from encrypted storage: ',
            error,
        );
        return null;
    }
};

export const localUpdateUserTokenByType = async (
    tokenType: UserTokenType,
    token: string,
) => {
    try {
        const allTokens = await localGetAllUserTokens();
        if (allTokens) {
            const updatedTokens = { ...allTokens, [tokenType]: token };
            localSaveUserTokens(updatedTokens);
        }
    } catch (error) {
        console.log('User token not updated in encrypted storage:: ', error);
    }
};

export const localDeleteAllUserTokens = async () => {
    try {
        await EncryptedStorage.removeItem(keys.USER_TOKENS);
    } catch (error) {
        console.log('User tokens not removed from encrypted storage: ', error);
    }
};

export const localClearEncryptedStorage = async () => {
    try {
        await EncryptedStorage.clear();
    } catch (error) {
        console.log('Encrypted storage is not cleared: ', error);
    }
};
