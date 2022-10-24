/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-cycle */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    AuthScreensParamList,
    RootScreensParamsList,
    ModalScreensParamsList,
} from './types';

import Drawer from '../components/organisms/Drawer';
/* Screens */
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import EmployeeHome from '../screens/EmployeeHome';
import ManagerHome from '../screens/ManagerHome';

/* Modals */
import ApplyLeave from '../screens/ApplyLeave';

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();
const StackNav = createNativeStackNavigator<RootScreensParamsList>();
const ModalNav = createNativeStackNavigator<ModalScreensParamsList>();

const ModalNavigator = () => (
    <ModalNav.Navigator
        screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
            gestureEnabled: true,
        }}>
        <ModalNav.Screen name='ApplyLeave' component={ApplyLeave} />
    </ModalNav.Navigator>
);

/* Auth navigator contains all the screens after the authtication */
const AuthNavigator = () => {
    const MemoizedDrawer = React.useCallback(() => <Drawer />, []);

    return (
        <DrawerNav.Navigator
            drawerContent={() => <MemoizedDrawer />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                headerTitle: '',
            }}>
            <DrawerNav.Screen name='EmployeeHome' component={EmployeeHome} />
            <DrawerNav.Screen name='ManagerHome' component={ManagerHome} />

            <DrawerNav.Screen name='Modal' component={ModalNavigator} />
        </DrawerNav.Navigator>
    );
};

/* Root navigator contains the screens before authentication */
const RootNavigator = () => (
    <NavigationContainer>
        <StackNav.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <StackNav.Screen name='Splash' component={Splash} />
            <StackNav.Screen name='Login' component={Login} />
            <StackNav.Screen name='Auth' component={AuthNavigator} />
        </StackNav.Navigator>
    </NavigationContainer>
);

export default RootNavigator;
