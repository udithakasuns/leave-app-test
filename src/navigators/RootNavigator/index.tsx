/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import LAErrorPopup from 'src/components/organisms/Global/LAErrorPopup';
import {
    Loading,
    LoginSocial,
    ProviderCode,
    LoginGeneral,
    ResetPw,
    ResetPwSuccess,
    ForgotPw,
} from 'src/screens/RootScreens';
import { useAuthentication } from 'src/utils/hooks/useAuthentication';
import useLogout from 'src/utils/hooks/useLogout';
import { useNotifications } from 'src/utils/hooks/useNotifications';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => {
    const {
        isAuthLoading,
        isAuthenticated,
        openInvalidUserPopup,
        onCloseInvalidUserPopup,
    } = useAuthentication();
    useNotifications({ isAuthenticated });

    const logout = useLogout();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
            />
            <StackNav.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {isAuthLoading ? (
                    <StackNav.Screen name='Loading' component={Loading} />
                ) : isAuthenticated ? (
                    <StackNav.Screen name='Auth' component={AuthNavigator} />
                ) : (
                    <>
                        <StackNav.Screen
                            name='LoginSocial'
                            component={LoginSocial}
                        />
                        <StackNav.Screen
                            name='ProviderCode'
                            component={ProviderCode}
                        />
                        <StackNav.Screen
                            name='LoginGeneral'
                            component={LoginGeneral}
                        />
                        <StackNav.Screen name='ResetPw' component={ResetPw} />
                        <StackNav.Screen
                            name='ResetPwSuccess'
                            component={ResetPwSuccess}
                        />
                        <StackNav.Screen name='ForgotPw' component={ForgotPw} />
                    </>
                )}
            </StackNav.Navigator>
            <LAErrorPopup
                type='api'
                title='Invalid User'
                subTitle='The app only supports rootcodelabs.com domain. Please logging with your rootcode email. Thank you!'
                visible={openInvalidUserPopup}
                onClose={onCloseInvalidUserPopup}
                primaryIcon='logout'
                primaryLabel='Logout  '
                primaryOnPress={() => {
                    onCloseInvalidUserPopup();
                    logout();
                }}
                secondaryLabel='Proceed'
                secondaryOnPress={onCloseInvalidUserPopup}
            />
        </SafeAreaView>
    );
};

export default RootNavigator;
