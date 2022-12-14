/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useUserStore } from 'src/store';

import ManagerHome from 'screens/ManagerHome';
import EmployeeHome from 'screens/EmployeeHome';
import ManagerViewAll from 'src/screens/ManagerViewAll';
import EmployeeViewAll from 'src/screens/EmployeeViewAll';
import NotificationViewAll from 'src/screens/NotificationViewAll';
import { AuthScreensParamList } from '../types';

import LADrawer from '../../components/organisms/Global/LADrawer';
/* Screens */

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();

/* Auth navigator contains all the screens after the authtication */
const AuthNavigator = () => {
    const MemoizedDrawer = React.useCallback(() => <LADrawer />, []);
    const {
        user: { role },
    } = useUserStore();
    return (
        <DrawerNav.Navigator
            initialRouteName={
                role === 'employee' ? 'EmployeeHome' : 'ManagerHome'
            }
            drawerContent={() => <MemoizedDrawer />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                headerTitle: '',
            }}>
            <DrawerNav.Screen name='EmployeeHome' component={EmployeeHome} />
            <DrawerNav.Screen
                name='EmployeeViewAll'
                component={EmployeeViewAll}
            />
            <DrawerNav.Screen
                name='ManagerViewAll'
                component={ManagerViewAll}
            />
            <DrawerNav.Screen name='ManagerHome' component={ManagerHome} />
            <DrawerNav.Screen
                name='NotificationViewAll'
                component={NotificationViewAll}
            />
        </DrawerNav.Navigator>
    );
};

export default AuthNavigator;
