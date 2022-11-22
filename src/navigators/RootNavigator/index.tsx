/* eslint-disable no-console */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import { Auth, Hub } from 'aws-amplify';
import { SigninPayload } from 'services/aws/types';
import {
    localDeleteAllUserTokens,
    localSaveUserTokens,
} from 'src/services/local';
import { useUserStore } from 'src/store';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const { saveUser, setIsAutherized, isAutherized } = useUserStore();

    const removeUserTokens = async () => {
        await localDeleteAllUserTokens();
    };

    const getCurrentAuthUser = async () => {
        const payload: SigninPayload = await Auth.currentAuthenticatedUser();
        console.log({ payload });
        if (payload) {
            const { accessToken, idToken, refreshToken } =
                payload.signInUserSession;

            /* Tokens will be saved to the local storage to use in axios calls */
            await localSaveUserTokens({
                accessToken: accessToken.jwtToken,
                idToken: idToken.jwtToken,
                refreshToken: refreshToken.token,
            });
            saveUser();
            setIsAutherized(true);
        }
    };

    useEffect(() => {
        getCurrentAuthUser();
    }, []);

    useEffect(() => {
        /* Hub is listened to all events related to authentication */
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'cognitoHostedUI':
                    getCurrentAuthUser();
                    break;
                case 'signOut':
                    removeUserTokens();
                    setIsAutherized(false);
                    break;
                default:
                    break;
            }
        });
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
