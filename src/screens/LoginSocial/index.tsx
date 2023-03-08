import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { LoginSocialScreenProps } from 'navigators/types';
import { awsOnAppleSignIn, awsOnGoogleSignIn } from 'src/services/aws';
import { Spacer } from 'components/atoms';
import { LALinkText, SocialButton } from 'components/molecules';
import Header from 'src/components/organisms/Login/Header';
import { useUserStore } from 'src/store';
import Footer from 'src/components/organisms/Login/Footer';
import { styles } from './styles';

const LoginSocial: React.FC<LoginSocialScreenProps> = ({ navigation }) => {
    const { setAuthLoading } = useUserStore();

    const onPressGoogleSignin = () => {
        setAuthLoading(true);
        awsOnGoogleSignIn();
    };

    const onPressAppleSignin = () => {
        setAuthLoading(true);
        awsOnAppleSignIn();
    };

    const onNavigateToProviderCode = () => navigation.navigate('ProviderCode');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {Platform.OS === 'ios' ? (
                    <Header description='Log into your organization account using your G-suite account Single Sign on, or using Apple account' />
                ) : (
                    <Header description='Log into your organization account using your G-suite account' />
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
                <Spacer height={8} />
                <LALinkText
                    containerStyle={styles.linkTextContainer}
                    text='Log in with email and password'
                    onPress={onNavigateToProviderCode}
                />
            </ScrollView>
            <Footer />
        </View>
    );
};

export default LoginSocial;
