import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import Splash from 'screens/Splash';
import { Auth, Hub } from 'aws-amplify';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const [user, setUser] = useState<any>();

    const getUser = async () =>
        Auth.currentAuthenticatedUser()
            .then(userData => userData)
            .catch(err => {});

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
                case 'signIn':
                case 'cognitoHostedUI':
                    getUser().then(userData => setUser(userData));
                    break;
                case 'signOut':
                    setUser(null);
                    break;
                case 'signIn_failure':
                case 'cognitoHostedUI_failure':
                    setUser(null);
                    break;
                default:
                    setUser(null);
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
                {user ? (
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
