/* eslint-disable no-console */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import Splash from 'screens/Splash';
import { Auth, Hub } from 'aws-amplify';
import { SigninPayload } from 'services/aws/types';
import {
    localDeleteAllUserTokens,
    localGetUserTokenByType,
    localSaveUserTokens,
} from 'src/services/local';
import { useUserStore } from 'src/store';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const [token, setToken] = useState<string>('');
    const { loading, setLoading } = useUserStore();

    const getAccessToken = async () => {
        const accessToken = await localGetUserTokenByType('accessToken');
        setToken(accessToken);
    };

    const removeUserTokens = async () => {
        await localDeleteAllUserTokens();
    };

    useEffect(() => {
        getAccessToken();
    }, []);

    const getUser = () =>
        Auth.currentAuthenticatedUser()
            .then(async (payload: SigninPayload) => {
                // const { name, email, picture } = payload.attributes;
                const { accessToken, idToken, refreshToken } =
                    payload.signInUserSession;

                setToken(accessToken.jwtToken);

                await localSaveUserTokens({
                    accessToken: accessToken.jwtToken,
                    idToken: idToken.jwtToken,
                    refreshToken: refreshToken.token,
                });
            })
            .catch(err => {
                // Need to handle auth error
            });

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            console.log({ event });
            switch (event) {
                case 'signIn':
                    // console.log('Signi in .....');
                    setLoading(false);
                    break;
                case 'cognitoHostedUI':
                    getUser();
                    // console.log('cognitoHostedUI');
                    break;
                case 'signOut':
                    removeUserTokens();
                    setToken('');
                    // console.log('Signi out .....');
                    break;
                case 'signIn_failure':
                    console.log('signIn_failure');
                    break;
                case 'cognitoHostedUI_failure':
                    // console.log('cognitoHostedUI_failure');
                    // removeUserTokens();
                    break;
                default:
                    break;
                // removeUserTokens();
            }
        });

        // getUser().then(userData => setUser(userData));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
            />
            <StackNav.Navigator
                // initialRouteName='Auth'
                screenOptions={{
                    headerShown: false,
                }}>
                {token ? (
                    <StackNav.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <>
                        {/* <StackNav.Screen name='Splash' component={Splash} /> */}
                        <StackNav.Screen name='Login' component={Login} />
                    </>
                )}
            </StackNav.Navigator>
        </SafeAreaView>
    );
};

export default RootNavigator;
