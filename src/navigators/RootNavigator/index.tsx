import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import Login from 'screens/Login';
import Splash from 'screens/Splash';
import AuthNavigator from '../AuthNavigator';
import { RootScreensParamsList } from '../types';
import { styles } from './styles';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => (
    <SafeAreaView style={styles.container}>
        <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        />
        <StackNav.Navigator
            initialRouteName='Auth'
            screenOptions={{
                headerShown: false,
            }}>
            <StackNav.Screen name='Splash' component={Splash} />
            <StackNav.Screen name='Login' component={Login} />
            <StackNav.Screen name='Auth' component={AuthNavigator} />
        </StackNav.Navigator>
    </SafeAreaView>
);

export default RootNavigator;
