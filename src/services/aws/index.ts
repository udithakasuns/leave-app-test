/* eslint-disable consistent-return */
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export const awsOnGoogleSignIn = async () =>
    Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
    });

export const awsOnSignOut = async () => {
    await Auth.signOut();
};

export const awsOnGeneralSignIn = (username: string, password: string) => {
    Auth.signIn({ username, password });
};

/* Used in axios interceptors */
export const awsGetCurrentAccessToken = async (): Promise<string> => {
    try {
        const currentUser = await Auth.currentAuthenticatedUser();
        const accessToken = (await Auth.userSession(currentUser))
            .getAccessToken()
            .getJwtToken();

        return accessToken;
    } catch (error) {
        return '';
    }
};

/* Used in axios interceptors */
export const awsGetNewAccessToken = async (): Promise<string | undefined> => {
    try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const refreshTokenObject =
            cognitoUser.getSignInUserSession().refreshToken;
        cognitoUser.refreshSession(
            refreshTokenObject,
            async (err: any, session: any) => {
                const { accessToken } = session;
                return accessToken.jwtToken;
            },
        );
    } catch (error) {
        return '';
    }
};
