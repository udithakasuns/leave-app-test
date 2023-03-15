import React, { useState, LegacyRef, createRef } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import Footer from 'src/components/organisms/Login/Footer';
import Header from 'src/components/organisms/Login/Header';
import { awsOnGeneralSignIn } from 'src/services/aws';
import { useUserStore } from 'src/store';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const LoginGeneral = () => {
    const { setAuthLoading } = useUserStore();
    const passwordRef: LegacyRef<TextInput> = createRef();
    const [email, setEmail] = useState<string>('udithakasun311@gmail.com');
    const [password, setPassword] = useState<string>('^67Svi6DsqMe@j');
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    const onChangeEmail = (text: string) => setEmail(text);
    const onChangePassword = (text: string) => setPassword(text);
    const onSubmitEmail = () => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    };

    const onToggleHidePassword = () => setHidePassword(prevState => !prevState);

    const onLogin = () => {
        setAuthLoading(true);
        awsOnGeneralSignIn(email, password);
    };

    /* Need to handle errors */

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollView}>
                <Header description='Enter your email and password to Sign in to the system.' />
                <Input
                    testIdInput='txtLoginEmail'
                    label='Enter Rootcode email'
                    placeholder=''
                    value={email}
                    autoCapitalize='none'
                    onChangeText={onChangeEmail}
                    onSubmitEditing={onSubmitEmail}
                    inputContainerStyle={styles.input}
                />
                <Input
                    reference={passwordRef}
                    testIdInput='txtLoginPassword'
                    label='Enter current password'
                    placeholder=''
                    value={password}
                    autoCapitalize='none'
                    onChangeText={onChangePassword}
                    rightIconName={
                        hidePassword ? 'eye-outline' : 'eye-off-outline'
                    }
                    rightIconColor={colors.gray}
                    secureTextEntry={hidePassword}
                    onSubmitEditing={onLogin}
                    inputContainerStyle={styles.input}
                    onPressRightIcon={onToggleHidePassword}
                />
                <Spacer height={20} />
                <Button
                    testID='btnLogin'
                    label='Login'
                    onPress={onLogin}
                    iconPosition='left'
                    icon='arrow-forward'
                />
                <Spacer height={8} />
                <Text
                    type='SubH'
                    style={styles.bottomText}
                    color={colors.gray600}>
                    Sign in with email and password
                </Text>
            </ScrollView>
            <Footer />
        </View>
    );
};

export default LoginGeneral;
