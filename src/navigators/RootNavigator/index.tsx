import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreensParamsList } from '../types';
import Splash from '../../screens/Splash';
import Login from '../../screens/Login';
import AuthNavigator from '../AuthNavigator';

const StackNav = createNativeStackNavigator<RootScreensParamsList>();

/* Root navigator contains the screens before authentication */
const RootNavigator = () => (
    // <NavigationContainer>
    <StackNav.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <StackNav.Screen name='Splash' component={Splash} />
        <StackNav.Screen name='Login' component={Login} />
        <StackNav.Screen name='Auth' component={AuthNavigator} />
    </StackNav.Navigator>
    // </NavigationContainer>
);

export default RootNavigator;
