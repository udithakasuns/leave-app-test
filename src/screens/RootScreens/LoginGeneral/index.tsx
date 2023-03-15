import React from 'react';
import { View } from 'react-native';
import { BackHeader } from 'src/components/molecules';
import { LARootHeader, LARootFooter } from 'src/components/molecules/LARoot';
import { Content } from 'src/components/organisms/LoginGeneral';
import { LoginGeneralScreenProps } from 'src/navigators/types';
import { screenStyles } from 'src/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { toastConfig } from 'src/utils/alerts';

const LoginGeneral: React.FC<LoginGeneralScreenProps> = ({ navigation }) => {
    const onGoBack = () => navigation.goBack();

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onGoBack} />
            <KeyboardAwareScrollView
                contentContainerStyle={screenStyles.scrollViewCenterContainer}>
                <LARootHeader
                    showLogo
                    title='Sign in'
                    subTitle='Log into your account using your work email and password.'
                />
                <Content />
            </KeyboardAwareScrollView>
            <LARootFooter />
            <Toast
                config={toastConfig}
                position='bottom'
                bottomOffset={0}
                autoHide
            />
        </View>
    );
};

export default LoginGeneral;
