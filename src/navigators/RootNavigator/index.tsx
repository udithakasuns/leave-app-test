/* eslint-disable @typescript-eslint/naming-convention */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import LoginSocial from 'src/screens/LoginSocial';
// import LoginGeneral from 'screens/LoginGeneral';
import { useAuthentication } from 'src/utils/hooks/useAuthentication';
import { useNotifications } from 'src/utils/hooks/useNotifications';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const { isAuthenticated } = useAuthentication();
    useNotifications({ isAuthenticated });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
            />
            <StackNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {isAuthenticated ? (
                    <StackNav.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <StackNav.Screen name='Login' component={LoginSocial} />
                    // <StackNav.Screen name='Login' component={LoginGeneral} />
                )}
            </StackNav.Navigator>
        </SafeAreaView>
    );
};

export default RootNavigator;
