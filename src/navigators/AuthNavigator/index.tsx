/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthScreensParamList } from '../types';

import Drawer from '../../components/organisms/Drawer';
/* Screens */

import EmployeeHome from '../../screens/EmployeeHome';
import ManagerHome from '../../screens/ManagerHome';

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();

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
        </DrawerNav.Navigator>
    );
};

export default AuthNavigator;
