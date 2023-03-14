/* eslint-disable consistent-return */
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import {
    GeneralSigninFailedProps,
    GeneralSigninSuccessProps,
    GeneralSigninUser,
    GenricResolveProps,
} from './types';

export const awsOnGoogleSignIn = async () =>
    Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
    });

export const awsOnAppleSignIn = () =>
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple });

export const awsOnSignOut = async () => {
    await Auth.signOut();
};

export const awsOnGeneralSignIn = (username: string, password: string) =>
    new Promise<GeneralSigninSuccessProps | GeneralSigninFailedProps>(
        (resolve, reject) => {
            Auth.signIn({ username, password })
                .then(user => {
                    resolve({ isSuccess: true, user });
                })
                .catch(err => {
                    if (err && err.code) {
                        resolve({
                            isSuccess: false,
                            code: err.code,
                            message: err.message,
                        });
                    } else {
                        reject();
                    }
                });
        },
    );

export const awsOnResetInitialPw = (
    user: GeneralSigninUser,
    newPassword: string,
) =>
    new Promise<GenricResolveProps>((resolve, reject) => {
        Auth.completeNewPassword(user, newPassword, { name: user.username })
            .then(() => {
                resolve({
                    isSuccess: true,
                    message: '',
                });
            })
            .catch(err => {
                if (err) {
                    resolve({
                        isSuccess: false,
                        message: err.message,
                    });
                } else {
                    reject(err);
                }
            });
    });

export const awsOnForgotpwEmailSubmit = (username: string) =>
    new Promise<GenricResolveProps>((resolve, reject) => {
        Auth.forgotPassword(username)
            .then(() => {
                resolve({
                    isSuccess: true,
                    message: '',
                });
            })
            .catch(err => {
                if (err) {
                    resolve({
                        isSuccess: false,
                        message: err.message,
                    });
                } else {
                    reject(err);
                }
            });
    });

export const awsOnForgotPwSubmit = (
    username: string,
    code: string,
    password: string,
) =>
    new Promise<GenricResolveProps>((resolve, reject) => {
        Auth.forgotPasswordSubmit(username, code, password)
            .then(() => {
                resolve({ isSuccess: true, message: '' });
            })
            .catch(err => {
                if (err) {
                    resolve({
                        isSuccess: false,
                        message: err.message,
                    });
                } else {
                    reject(err);
                }
            });
    });

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
