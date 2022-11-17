import React from 'react';
import { View, ScrollView } from 'react-native';
import { LoginScreenProps } from 'navigators/types';
import { Amplify } from 'aws-amplify';
import amplifiConfig from 'src/aws-exports';
import { awsOnGoogleSignIn } from 'src/services/aws';
import inAppUrlHandler from 'utils/helpers/inAppUrlHandler';
import { Spacer, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { SocialButton } from 'components/molecules';
import Header from 'src/components/organisms/Login/Header';
import { useUserStore } from 'src/store';
import { styles } from './styles';

Amplify.configure({
    ...amplifiConfig,
    oauth: {
        ...amplifiConfig.oauth,
        urlOpener: inAppUrlHandler,
    },
});

const { colors } = theme;

const Login: React.FC<LoginScreenProps> = () => {
    const { loading, setLoading } = useUserStore();

    const onPressGoogleSignIn = () => {
        setLoading(true);
        awsOnGoogleSignIn();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Header description='Log into your Rootcode account using your G-suite account Single Sign on' />
                <SocialButton
                    disabled={loading}
                    label='Sign in with Rootcode Gmail'
                    iconName='google'
                    onPress={onPressGoogleSignIn}
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

export default Login;
