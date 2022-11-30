import React from 'react';
import { View, ScrollView } from 'react-native';
import { LoginScreenProps } from 'navigators/types';
import { awsOnGoogleSignIn } from 'src/services/aws';
import { Spacer, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { SocialButton } from 'components/molecules';
import Header from 'src/components/organisms/Login/Header';
import { useAuthStore } from 'src/store';
import { styles } from './styles';

const { colors } = theme;

const LoginSocial: React.FC<LoginScreenProps> = () => {
    const { setAuthType } = useAuthStore();

    const onPressGoogleSignin = () => {
        setAuthType('social');
        awsOnGoogleSignIn();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Header description='Log into your Rootcode account using your G-suite account Single Sign on' />
                <SocialButton
                    label='Sign in with Rootcode Gmail'
                    iconName='google'
                    onPress={onPressGoogleSignin}
                />
                <Spacer height={8} />
                <Text
                    type='SubH'
                    style={styles.bottomText}
                    color={colors.gray600}>
                    Sign in with email and password
                </Text>
            </ScrollView>
        </View>
    );
};

export default LoginSocial;
