import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { LoginSocialScreenProps } from 'navigators/types';
import { awsOnAppleSignIn, awsOnGoogleSignIn } from 'src/services/aws';
import { Spacer } from 'components/atoms';
import {
    LALinkText,
    LARootFooter,
    LARootHeader,
    SocialButton,
} from 'components/molecules';

import { useUserStore } from 'src/store';
import { styles } from './styles';

const LoginSocial: React.FC<LoginSocialScreenProps> = ({ navigation }) => {
    const { setUserAuth } = useUserStore();

    const onPressGoogleSignin = () => {
        setUserAuth({ loading: true, type: 'social' });
        awsOnGoogleSignIn();
    };

    const onPressAppleSignin = () => {
        setUserAuth({ loading: true, type: 'social' });
        awsOnAppleSignIn();
    };

    const onNavigateToLoginGeneral = () => navigation.navigate('LoginGeneral');

    const getSubTitle = (): string =>
        Platform.OS === 'ios'
            ? 'Log into your organization account using your G-suite account Single Sign on, or using Apple account'
            : 'Log into your organization account using your G-suite account';

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <LARootHeader
                    showLogo
                    title='Sign in'
                    subTitle={getSubTitle()}
                />
                <SocialButton
                    label='Sign in with Gmail'
                    iconName='google'
                    onPress={onPressGoogleSignin}
                />
                {Platform.OS === 'ios' && (
                    <>
                        <Spacer />
                        <SocialButton
                            label='Sign in with Apple' // Do not change this string (as of apple guide line).
                            iconName='apple'
                            iconType='icon'
                            onPress={onPressAppleSignin}
                        />
                    </>
                )}
                <Spacer height={8} />
                <LALinkText
                    containerStyle={styles.linkTextContainer}
                    text='Log in with email and password'
                    onPress={onNavigateToLoginGeneral}
                />
            </ScrollView>
            <LARootFooter />
        </View>
    );
};

export default LoginSocial;
