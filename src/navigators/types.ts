import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthScreensParamList = {
    EmployeeHome: undefined;
    ManagerHome: undefined;
    Notifications: undefined;
};

export type RootScreensParamsList = {
    Splash: undefined;
    Login: undefined;
    Auth: NavigatorScreenParams<AuthScreensParamList>;
};

export type SplashScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'Splash'
>;

export type LoginScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'Login'
>;

export type EmployeeHomeScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'EmployeeHome'
>;
export type ManagerHomeScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'ManagerHome'
>;

export type NotificationsScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'Notifications'
>;

export type DrawerScreenNavigationProp = DrawerNavigationProp<
    AuthScreensParamList,
    'EmployeeHome'
>;
