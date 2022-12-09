/* eslint-disable @typescript-eslint/naming-convention */
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import {
    AuthGeneralUserPayload,
    AuthSocialUserPayload,
} from 'src/services/aws/types';
import { usePersistStore, useRecipientStore, useUserStore } from 'src/store';
import amplifiConfig from 'src/aws-exports';
import { deleteHttpNotificationDevice } from 'src/services/http';
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
    isAuthenticated: boolean;
};

export const useAuthentication = (): ReturnProps => {
    const { saveUser, updateUser, removeUser } = useUserStore();
    const { updateRecipients, removeUserRecipients } = useRecipientStore();
    const {
        isAutherized,
        setIsAutherized,
        authType,
        setAuthType,
        setDeviceUniqueId,
        deviceUniqueId,
    } = usePersistStore();
    const [visibleAuthNav, setVisibleAuthNav] = useState<boolean>(false);

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
                await updateUser();
                updateRecipients();
                setIsAutherized(true);
                setVisibleAuthNav(true);
            } else {
                setVisibleAuthNav(false);
                removeUser();
                removeUserRecipients();
            }
        } catch (error) {
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
                await updateUser(); // This will returns an error (Need to fix from backend)
                updateRecipients();
                setIsAutherized(true);
                setVisibleAuthNav(true);
            }
        } catch (error) {
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
        }
    }, [isAutherized]);

    const onDeRegisterDeviceForNotifications = async (): Promise<boolean> => {
        /* 
            When signout, device of the user will be deregistered from the backend,
            otherwise, notifications will be recieved even the user has signed out
        */
        if (deviceUniqueId) {
            await deleteHttpNotificationDevice(deviceUniqueId);
            setDeviceUniqueId(null);
        }
        return true;
    };

    const onSignout = async () => {
        await onDeRegisterDeviceForNotifications();
        setIsAutherized(false);
        setAuthType('');
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

    return { isAuthenticated: visibleAuthNav };
};
