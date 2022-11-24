/* eslint-disable @typescript-eslint/naming-convention */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import { Auth, Hub } from 'aws-amplify';
import { AccessTokenPayload, AuthUserPayload } from 'services/aws/types';
import {
    localDeleteAllUserTokens,
    localGetUserTokenByType,
    localSaveUserTokens,
} from 'src/services/local';
import { useUserStore } from 'src/store';
import jwtDecode from 'jwt-decode';
import { UserRole } from 'src/utils/types';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

const getCurrentUserRoleFromToken = (accessToken: string): UserRole => {
    const decodedAccesToken: AccessTokenPayload = jwtDecode(accessToken);
    const cognitoUserGroups = decodedAccesToken['cognito:groups'];
    let userRole: UserRole = 'employee';
    if (
        cognitoUserGroups &&
        cognitoUserGroups.find(user => user === 'managers')
    ) {
        userRole = 'manager';
    }
    return userRole;
};

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const { saveUser, updateUser, removeUser, setIsAutherized, isAutherized } =
        useUserStore();

    const removeUserTokens = async () => {
        await localDeleteAllUserTokens();
    };

    const getCurrentAuthUser = async () => {
        try {
            const authUser: AuthUserPayload =
                await Auth.currentAuthenticatedUser();
            if (authUser) {
                const {
                    attributes: { email, name, family_name, picture },
                    signInUserSession: { accessToken, idToken, refreshToken },
                } = authUser;

                const userRole = getCurrentUserRoleFromToken(
                    accessToken.jwtToken,
                );

                /* Tokens will be saved to the local storage to use in axios calls */
                await localSaveUserTokens({
                    accessToken: accessToken.jwtToken,
                    idToken: idToken.jwtToken,
                    refreshToken: refreshToken.token,
                });
                saveUser(email, name, family_name, picture, userRole);
                await updateUser();
                setIsAutherized(true);
            } else {
                removeUserTokens();
                setIsAutherized(false);
                removeUser();
            }
        } catch (error) {
            // Error needs to be handled here
        }
    };

    const onLoadAuth = async () => {
        const accessToken = await localGetUserTokenByType('accessToken');
        if (accessToken) {
            getCurrentAuthUser();
        }
    };

    useEffect(() => {
        onLoadAuth();
    }, []);

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
                {isAutherized ? (
                    <StackNav.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <StackNav.Screen name='Login' component={Login} />
                )}
            </StackNav.Navigator>
        </SafeAreaView>
    );
};

export default RootNavigator;
