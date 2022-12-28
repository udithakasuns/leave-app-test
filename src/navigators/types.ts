import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthScreensParamList = {
    EmployeeHome: undefined;
    ManagerHome: undefined;
    EmployeeViewAll: undefined;
    ManagerViewAll: undefined;
    NotificationViewAll: undefined;
    Account: undefined;
    Settings: undefined;
    Support: undefined;
};

export type RootScreensParamsList = {
    Loading: undefined;
    Login: undefined;
    Auth: NavigatorScreenParams<AuthScreensParamList>;
};

export type LoadingScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'Loading'
>;

export type LoginScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'Login'
>;

export type EmployeeHomeScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'EmployeeHome'
>;

export type EmployeeViewAllScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'EmployeeViewAll'
>;

export type ManagerHomeScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'ManagerHome'
>;

export type NotificationViewAllScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'NotificationViewAll'
>;

export type ManagerViewAllScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'ManagerViewAll'
>;
export type AccountScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'Account'
>;
export type SettingsScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'Settings'
>;

export type SupportScreensProps = NativeStackScreenProps<
    AuthScreensParamList,
    'Support'
>;

export type DrawerScreenNavigationProp = DrawerNavigationProp<
    AuthScreensParamList,
    'EmployeeHome'
>;
