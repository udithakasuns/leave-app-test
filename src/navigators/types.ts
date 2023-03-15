import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GeneralSigninUser } from 'src/services/aws/types';
import { PwResetTypeConst } from 'src/utils/types';

export type InitialPwResetProps = {
    resetType: typeof PwResetTypeConst.INITIAL;
    user: GeneralSigninUser;
};

export type ForgotPwResetProps = {
    resetType: typeof PwResetTypeConst.FORGOT_PW;
    userEmail: string;
};

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
    LoginSocial: undefined;
    LoginGeneral: undefined;
    ResetPw: InitialPwResetProps | ForgotPwResetProps;
    ResetPwSuccess: undefined;
    ProviderCode: undefined;
    Auth: NavigatorScreenParams<AuthScreensParamList>;
};

export type LoadingScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'Loading'
>;

export type LoginSocialScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'LoginSocial'
>;

export type LoginGeneralScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'LoginGeneral'
>;

export type ResetPwScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'ResetPw'
>;

export type ResetPwSuccessScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'ResetPwSuccess'
>;

export type ProviderCodeScreenProps = NativeStackScreenProps<
    RootScreensParamsList,
    'ProviderCode'
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
