/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useUserStore } from 'src/store';

import ManagerHome from 'screens/ManagerHome';
import EmployeeHome from 'screens/EmployeeHome';
import Notifications from 'screens/Notifications';
import { AuthScreensParamList } from '../types';

import Drawer from '../../components/organisms/Global/Drawer';

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();

/* Auth navigator contains all the screens after the authtication */
const AuthNavigator = () => {
    const MemoizedDrawer = React.useCallback(() => <Drawer />, []);
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
            <DrawerNav.Screen name='ManagerHome' component={ManagerHome} />
            <DrawerNav.Screen name='Notifications' component={Notifications} />
        </DrawerNav.Navigator>
    );
};

export default AuthNavigator;
