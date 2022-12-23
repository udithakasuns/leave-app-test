/* eslint-disable @typescript-eslint/naming-convention */
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
    AuthGeneralUserPayload,
    AuthSocialUserPayload,
} from 'src/services/aws/types';
import { usePersistStore, useRecipientStore, useUserStore } from 'src/store';
import amplifiConfig from 'src/aws-exports';
import { getCurrentUserRoleFromToken } from '../helpers/gettersUtil';
import inAppUrlHandler from '../helpers/inAppUrlHandler';

Amplify.configure({
    ...amplifiConfig,
    oauth: {
        ...amplifiConfig.oauth,
        urlOpener: inAppUrlHandler,
    },
});

type ReturnProps = {
    isAuthLoading: boolean;
    isAuthenticated: boolean;
    openInvalidUserPopup: boolean;
    onCloseInvalidUserPopup: () => void;
};

const isRootcodeUser = (email: string): boolean => {
    const rootcodeDomain = 'rootcodelabs.com';
    const emailDomain = email.split('@')[1];
    if (emailDomain === rootcodeDomain) {
        return true;
    }
    return false;
};

export const useAuthentication = (): ReturnProps => {
    const { authLoading, saveUser, updateUser, removeUser, setAuthLoading } =
        useUserStore();
    const { updateRecipients, removeUserRecipients } = useRecipientStore();
    const {
        isAutherized,
        setIsAutherized,
        authType,
        setAuthType,
        setDeviceUniqueId,
    } = usePersistStore();

    const [visibleAuthNav, setVisibleAuthNav] = useState<boolean>(false);
    const [openInvalidUserPopup, setOpenInvalidUserPopup] =
        useState<boolean>(false);

    const getCurrentSocialAuthUser = async () => {
        try {
            const authUser: AuthSocialUserPayload =
                await Auth.currentAuthenticatedUser();

            if (authUser) {
                const {
                    attributes: { email, name, family_name, picture },
                    signInUserSession: { accessToken },
                } = authUser;

                const userRole = getCurrentUserRoleFromToken(
                    accessToken.jwtToken,
                );

                saveUser(email, name, family_name, picture, userRole);

                const isValidUser = isRootcodeUser(email);

                if (!isValidUser) {
                    setOpenInvalidUserPopup(true);
                } else {
                    await updateUser();
                }

                updateRecipients();
                setIsAutherized(true);
                setVisibleAuthNav(true);
                setAuthLoading(false);
            } else {
                setVisibleAuthNav(false);
                removeUser();
                removeUserRecipients();
                setAuthLoading(false);
            }
        } catch (error) {
            setAuthLoading(false);
            // Error needs to be handled here
        }
    };

    const getCurrentGeneralAuthUser = async () => {
        try {
            const authUser: AuthGeneralUserPayload =
                await Auth.currentAuthenticatedUser();

            if (authUser) {
                const {
                    attributes: { email },
                    signInUserSession: { accessToken },
                } = authUser;

                const name = email.split('@')[0];

                const userRole = getCurrentUserRoleFromToken(
                    accessToken.jwtToken,
                );

                saveUser(email, name, '', '', userRole);

                const isValidUser = isRootcodeUser(email);

                if (!isValidUser) {
                    setOpenInvalidUserPopup(true);
                } else {
                    await updateUser(); // This will returns an error (Need to fix from backend)
                }

                updateRecipients();
                setIsAutherized(true);
                setVisibleAuthNav(true);
                setAuthLoading(false);
            }
        } catch (error) {
            setAuthLoading(false);
            // Error needs to be handled here
        }
    };

    useEffect(() => {
        /* 
            Initially check whether the user has already signed in to the application.
            If so, check wheather the authentication type that the user has used.
        */

        if (isAutherized) {
            if (authType === 'social') {
                getCurrentSocialAuthUser();
            } else {
                getCurrentGeneralAuthUser();
            }
        } else {
            setVisibleAuthNav(false);
            setTimeout(() => {
                setAuthLoading(false);
            }, 2000);
        }
    }, [isAutherized]);

    const onSignout = async () => {
        setDeviceUniqueId(null);
        setIsAutherized(false);
        setAuthType('');
        setAuthLoading(false);
    };

    useEffect(() => {
        /* Hub is listened to all events related to authentication */

        if (authType) {
            const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
                switch (event) {
                    /* Log the user based on auth type */
                    case 'signIn':
                        if (authType === 'social') {
                            getCurrentSocialAuthUser();
                        } else if (authType === 'general') {
                            getCurrentGeneralAuthUser();
                        }
                        break;
                    case 'signOut':
                        onSignout();
                        break;
                    default:
                        break;
                }
            });
            return () => unsubscribe();
        }
        return () => {};
    }, [authType]);

    return {
        isAuthenticated: visibleAuthNav,
        isAuthLoading: authLoading,
        openInvalidUserPopup,
        onCloseInvalidUserPopup: () => setOpenInvalidUserPopup(false),
    };
};
