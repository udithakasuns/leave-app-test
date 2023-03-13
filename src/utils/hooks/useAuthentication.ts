/* eslint-disable @typescript-eslint/naming-convention */
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { AuthUserPayload } from 'src/services/aws/types';
import { usePersistStore, useRecipientStore, useUserStore } from 'src/store';
import amplifiConfig from 'src/aws-exports';
import { COGNITO_CUSTOM_DOMAIN } from 'src/configs';
import { getCurrentUserRoleFromToken } from '../helpers/gettersUtil';
import { inAppAuthUrlHandler } from '../helpers/inAppUrlHandler';
import {
    setAppCenterAnalyticsLogs,
    setCrashlyticsLogs,
} from '../helpers/crashlyticsUtil';

Amplify.configure({
    ...amplifiConfig,
    oauth: {
        ...amplifiConfig.oauth,
        domain: COGNITO_CUSTOM_DOMAIN,
        urlOpener: inAppAuthUrlHandler,
    },
});

type ReturnProps = {
    isAuthLoading: boolean;
    isAuthenticated: boolean;
    openInvalidUserPopup: boolean;
    onCloseInvalidUserPopup: () => void;
};

const isRootcodeUser = (email: string): boolean => {
    const rootcodeLabsDomain = 'rootcodelabs.com';
    const rootcodeSoftwareDomain = 'rootcode.software';
    const emailDomain = email.split('@')[1];
    if (
        emailDomain === rootcodeLabsDomain ||
        emailDomain === rootcodeSoftwareDomain
    ) {
        return true;
    }
    return false;
};

export const useAuthentication = (): ReturnProps => {
    const { setUserAuth, saveUser, updateUser, removeUser, userAuth } =
        useUserStore();
    const { updateRecipients, removeUserRecipients } = useRecipientStore();
    const { setDeviceUniqueId } = usePersistStore();

    const [visibleAuthNav, setVisibleAuthNav] = useState<boolean>(false);
    const [openInvalidUserPopup, setOpenInvalidUserPopup] =
        useState<boolean>(false);

    const getCurrentAuthUser = async () => {
        try {
            const authUser: AuthUserPayload =
                await Auth.currentAuthenticatedUser();
            const {
                attributes: { email, name, family_name, picture },
                signInUserSession: { accessToken },
            } = authUser;

            const userRole = getCurrentUserRoleFromToken(accessToken.jwtToken);

            saveUser(email, name, family_name, picture, userRole);
            setCrashlyticsLogs(email);
            setAppCenterAnalyticsLogs(email);

            const isValidUser = isRootcodeUser(email);

            if (!isValidUser) {
                setOpenInvalidUserPopup(true);
            } else {
                await updateUser();
            }

            updateRecipients();
            setVisibleAuthNav(true);

            setUserAuth({ loading: false, type: 'none' });
        } catch {
            setVisibleAuthNav(false);
            removeUser();
            removeUserRecipients();
            setUserAuth({ loading: false, type: 'none' });
        }
    };

    useEffect(() => {
        getCurrentAuthUser();
    }, []);

    const onSignout = async () => {
        setDeviceUniqueId(null);
        setVisibleAuthNav(false);
        setUserAuth({ loading: false, type: 'none' });
    };

    useEffect(() => {
        /* Hub is listened to all events related to authentication */
        const unsubscribe = Hub.listen(
            'auth',
            async ({ payload: { event } }) => {
                switch (event) {
                    /* Log the user based on auth type */
                    case 'signIn': {
                        if (userAuth.type !== 'none') {
                            getCurrentAuthUser();
                        }
                        break;
                    }
                    case 'signOut':
                        onSignout();
                        break;
                    default:
                        break;
                }
            },
        );
        return () => unsubscribe();
    }, [userAuth.type]);

    return {
        isAuthenticated: visibleAuthNav,
        isAuthLoading: userAuth.loading,
        openInvalidUserPopup,
        onCloseInvalidUserPopup: () => setOpenInvalidUserPopup(false),
    };
};
