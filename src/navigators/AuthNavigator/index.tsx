/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useUserStore } from 'src/store';
import {
    EmployeeHome,
    EmployeeViewAll,
    ManagerHome,
    ManagerViewAll,
    NotificationViewAll,
} from 'src/screens/AuthScreens';
import {
    Account,
    Settings,
    Support,
} from 'src/screens/AuthScreens/DrawerScreens';
import LAGlobalEmployee from 'src/components/organisms/Global/LAGlobalEmployee';
import LAGlobalManager from 'src/components/organisms/Global/LAGlobalManager';
import LADrawer from '../../components/organisms/Global/LADrawer';
import { AuthScreensParamList } from '../types';

/* Screens */

const DrawerNav = createDrawerNavigator<AuthScreensParamList>();

interface DrawerProp {
    navigation: any;
}

/* Auth navigator contains all the screens after the authtication */
const AuthNavigator = () => {
    const MemoizedDrawer = React.useCallback(
        ({ navigation }: DrawerProp) => <LADrawer navigation={navigation} />,
        [],
    );
    const {
        user: { role },
    } = useUserStore();
    return (
        <>
            <DrawerNav.Navigator
                initialRouteName={
                    role === 'employee' ? 'EmployeeHome' : 'ManagerHome'
                }
                drawerContent={({ navigation }) => (
                    <MemoizedDrawer navigation={navigation} />
                )}
                screenOptions={{
                    headerShown: false,
                    drawerType: 'front',
                }}>
                <DrawerNav.Screen
                    name='EmployeeHome'
                    component={EmployeeHome}
                />
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
                <DrawerNav.Screen name='Account' component={Account} />
                <DrawerNav.Screen name='Settings' component={Settings} />
                <DrawerNav.Screen name='Support' component={Support} />
            </DrawerNav.Navigator>
            <LAGlobalEmployee />
            <LAGlobalManager />
        </>
    );
};

export default AuthNavigator;
