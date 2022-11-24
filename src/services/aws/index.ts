/* eslint-disable consistent-return */
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { localSaveUserTokens } from '../local';

export const awsOnGoogleSignIn = async () =>
    Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
    });

export const awsGetNewAccessToken = async (): Promise<string | undefined> => {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const refreshTokenObject =
            cognitoUser.getSignInUserSession().refreshToken;
        cognitoUser.refreshSession(
            refreshTokenObject,
            async (err: any, session: any) => {
                if (session) {
                    const { idToken, refreshToken, accessToken } = session;
                    /* New Tokens will be saved to the local storage to use in axios calls */
                    await localSaveUserTokens({
                        accessToken: accessToken.jwtToken,
                        idToken: idToken.jwtToken,
                        refreshToken: refreshToken.token,
                    });
                    return accessToken.jwtToken;
                }
                return '';
            },
        );
    } catch (error) {
        return '';
    }
};
