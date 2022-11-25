/* eslint-disable @typescript-eslint/naming-convention */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
// import LoginGeneral from 'screens/LoginGeneral';
import { Amplify, Auth, Hub } from 'aws-amplify';
import {
    AuthGeneralUserPayload,
    AuthSocialUserPayload,
} from 'services/aws/types';
import { useAuthStore, useUserStore } from 'src/store';
import { getCurrentUserRoleFromToken } from 'src/utils/helpers/gettersUtil';
import amplifiConfig from 'src/aws-exports';
import inAppUrlHandler from 'src/utils/helpers/inAppUrlHandler';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

Amplify.configure({
    ...amplifiConfig,
    oauth: {
        ...amplifiConfig.oauth,
        urlOpener: inAppUrlHandler,
    },
});

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const { saveUser, updateUser, removeUser } = useUserStore();
    const { isAutherized, setIsAutherized, authType, setAuthType } =
        useAuthStore();
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
                setAuthType('social');
                setIsAutherized(true);
                setVisibleAuthNav(true);
            } else {
                setVisibleAuthNav(false);
                removeUser();
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
                setAuthType('general');
                setIsAutherized(true);
                setVisibleAuthNav(true);
            }
        } catch (error) {
            // Error needs to be handled here
        }
    };

    /* 
        Initially check whether the user has already signed in to the application.
        If so, check wheather the authentication type that the user has used.
    */
    useEffect(() => {
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

    useEffect(() => {
        /* Hub is listened to all events related to authentication */
        const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
            switch (event) {
                /* Social Signin event */
                case 'cognitoHostedUI':
                    getCurrentSocialAuthUser();
                    break;

                /* General Signin event */
                case 'signIn':
                    getCurrentGeneralAuthUser();
                    break;
                case 'signOut':
                    setIsAutherized(false);
                    break;
                default:
                    break;
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
            />
            <StackNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {visibleAuthNav ? (
                    <StackNav.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <StackNav.Screen name='Login' component={Login} />
                    // <StackNav.Screen name='Login' component={LoginGeneral} />
                )}
            </StackNav.Navigator>
        </SafeAreaView>
    );
};

export default RootNavigator;
