/* eslint-disable @typescript-eslint/naming-convention */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import { Auth, Hub } from 'aws-amplify';
import { AuthUserPayload } from 'services/aws/types';
import { useAuthStore, useUserStore } from 'src/store';
import { getCurrentUserRoleFromToken } from 'src/utils/helpers/gettersUtil';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const { saveUser, updateUser, removeUser } = useUserStore();
    const { isAutherized, setIsAutherized } = useAuthStore();
    const [visibleAuthNav, setVisibleAuthNav] = useState<boolean>(false);

    const getCurrentAuthUser = async () => {
        try {
            const authUser: AuthUserPayload =
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

    useEffect(() => {
        if (isAutherized) {
            getCurrentAuthUser();
        } else {
            setVisibleAuthNav(false);
        }
    }, [isAutherized]);

    useEffect(() => {
        /* Hub is listened to all events related to authentication */
        const unsubscribe = Hub.listen('auth', ({ payload: { event } }) => {
            switch (event) {
                case 'cognitoHostedUI':
                    getCurrentAuthUser();
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
                )}
            </StackNav.Navigator>
        </SafeAreaView>
    );
};

export default RootNavigator;
