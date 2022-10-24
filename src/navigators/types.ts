import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ModalScreensParamsList = {
    ApplyLeave: undefined;
};

export type AuthScreensParamList = {
    EmployeeHome: undefined;
    ManagerHome: undefined;
    Modal: NavigatorScreenParams<ModalScreensParamsList>;
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

export type ApplyLeaveScreensProps = NativeStackScreenProps<
    ModalScreensParamsList,
    'ApplyLeave'
>;
