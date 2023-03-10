import React from 'react';
import { View, ScrollView } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BackHeader } from 'src/components/molecules';
import {
    LASigninFooter,
    LASigninHeader,
} from 'src/components/molecules/LASignin';
import { Content } from 'src/components/organisms/LoginGeneral';
import { LoginGeneralScreenProps } from 'src/navigators/types';
import { GeneralSigninUser } from 'src/services/aws/types';
import { toastConfig } from 'src/utils/alerts';
import { screenStyles } from 'src/utils/styles';
import { styles } from './styles';

const LoginGeneral: React.FC<LoginGeneralScreenProps> = ({ navigation }) => {
    const onGoBack = () => navigation.goBack();

    const onNavigateToForgotPw = () => navigation.navigate('ForgotPw');
    const onNavigateToResetPw = (user: GeneralSigninUser) =>
        navigation.navigate('ResetPw', { user });

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onGoBack} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                contentContainerStyle={styles.scrollView}>
                <LASigninHeader description='Log into your account using your work email and password.' />
                <Content
                    onNavigateToResetPw={onNavigateToResetPw}
                    onNavigateToForgotPw={onNavigateToForgotPw}
                />
            </ScrollView>
            <LASigninFooter />
        </View>
    );
};

export default LoginGeneral;
