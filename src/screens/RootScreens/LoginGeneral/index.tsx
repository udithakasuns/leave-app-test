import React from 'react';
import { View } from 'react-native';
import { BackHeader } from 'src/components/molecules';
import {
    LASigninFooter,
    LASigninHeader,
} from 'src/components/molecules/LASignin';
import { Content } from 'src/components/organisms/LoginGeneral';
import { LoginGeneralScreenProps } from 'src/navigators/types';
import { GeneralSigninUser } from 'src/services/aws/types';
import { screenStyles } from 'src/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginGeneral: React.FC<LoginGeneralScreenProps> = ({ navigation }) => {
    const onGoBack = () => navigation.goBack();

    const onNavigateToForgotPw = () => navigation.navigate('ForgotPw');
    const onNavigateToResetPw = (user: GeneralSigninUser) =>
        navigation.navigate('ResetPw', { user });

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onGoBack} />
            <KeyboardAwareScrollView
                contentContainerStyle={screenStyles.scrollViewCenterContainer}>
                <LASigninHeader description='Log into your account using your work email and password.' />
                <Content
                    onNavigateToResetPw={onNavigateToResetPw}
                    onNavigateToForgotPw={onNavigateToForgotPw}
                />
            </KeyboardAwareScrollView>
            <LASigninFooter />
        </View>
    );
};

export default LoginGeneral;
