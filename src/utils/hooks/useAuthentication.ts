/* eslint-disable @typescript-eslint/naming-convention */
import { Amplify, Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { AuthUserPayload } from 'src/services/aws/types';
import { usePersistStore, useRecipientStore, useUserStore } from 'src/store';
import amplifiConfig from 'src/aws-exports';
import { COGNITO_CUSTOM_DOMAIN } from 'src/configs';
import { getHttpEmployee } from 'src/services/http';
import { getCurrentUserRoleFromToken } from '../helpers/gettersUtil';
import { inAppAuthUrlHandler } from '../helpers/inAppUrlHandler';
import {
    setAppCenterAnalyticsLogs,
    setCrashlyticsLogs,
} from '../helpers/crashlyticsUtil';
import { EmployeeType } from '../types';

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

export const useAuthentication = (): ReturnProps => {
    const { setUserAuth, setUser, removeUser, userAuth } = useUserStore();
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
                attributes: { email },
                signInUserSession: { accessToken },
            } = authUser;

            const userRole = getCurrentUserRoleFromToken(accessToken.jwtToken);

            const employee: EmployeeType = await getHttpEmployee();

            setUser(employee, userRole);
            setCrashlyticsLogs(email);
            setAppCenterAnalyticsLogs(email);

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
