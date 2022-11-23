/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmployeeHome from 'screens/EmployeeHome';
import { useUserStore } from 'src/store';
import { AuthScreensParamList } from '../types';

import Drawer from '../../components/organisms/Drawer';
/* Screens */

import ManagerHome from '../../screens/ManagerHome';

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();

/* Auth navigator contains all the screens after the authtication */
const AuthNavigator = () => {
    const MemoizedDrawer = React.useCallback(() => <Drawer />, []);
    const {
        user: { role },
    } = useUserStore();
    return (
        <DrawerNav.Navigator
            drawerContent={() => <MemoizedDrawer />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
                headerTitle: '',
            }}>
            {role === 'employee' ? (
                <DrawerNav.Screen
                    name='EmployeeHome'
                    component={EmployeeHome}
                />
            ) : (
                <DrawerNav.Screen name='ManagerHome' component={ManagerHome} />
            )}
        </DrawerNav.Navigator>
    );
};

export default AuthNavigator;
