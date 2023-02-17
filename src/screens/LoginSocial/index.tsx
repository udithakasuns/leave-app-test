import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { LoginScreenProps } from 'navigators/types';
import { awsOnAppleSignIn, awsOnGoogleSignIn } from 'src/services/aws';
import { Spacer, Text } from 'components/atoms';
import { SocialButton } from 'components/molecules';
import Header from 'src/components/organisms/Login/Header';
import { usePersistStore } from 'src/store';
import Footer from 'src/components/organisms/Login/Footer';
import { styles } from './styles';

const LoginSocial: React.FC<LoginScreenProps> = () => {
    const { setAuthType } = usePersistStore();

    const onPressGoogleSignin = () => {
        setAuthType('social');
        awsOnGoogleSignIn();
    };

    const onPressAppleSignin = () => {
        setAuthType('social');
        awsOnAppleSignIn();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {Platform.OS === 'ios' ? (
                    <Header description='Log into your Rootcode account using your G-suite account Single Sign on, or using Apple account.' />
                ) : (
                    <Header description='Log into your Rootcode account using your G-suite account.' />
                )}
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
                {/* <Spacer height={8} /> */}
                {/* <Text
                    type='SubH'
                    style={styles.bottomText}
                    color={colors.gray600}>
                    Sign in with email and password
                </Text> */}
            </ScrollView>
            <Footer />
        </View>
    );
};

export default LoginSocial;
