import React, { useState, LegacyRef, createRef } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import Header from 'src/components/organisms/Login/Header';
import { awsOnGeneralSignIn } from 'src/services/aws';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const LoginGeneral = () => {
    const passwordRef: LegacyRef<TextInput> = createRef();
    const [email, setEmail] = useState<string>('test_mobile_user');
    const [password, setPassword] = useState<string>('Test@1234');

    const onChangeEmail = (text: string) => setEmail(text);
    const onChangePassword = (text: string) => setPassword(text);
    const onSubmitEmail = () => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    };

    const onLogin = async () => {
        awsOnGeneralSignIn(email, password);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollView}>
                <Header description='Enter your email and password to Sign in to the system.' />
                <Input
                    label='Enter Rootcode email'
                    placeholder=''
                    value={email}
                    autoCapitalize='none'
                    onChangeText={onChangeEmail}
                    onSubmitEditing={onSubmitEmail}
                />
                <Input
                    reference={passwordRef}
                    label='Enter current password'
                    placeholder=''
                    value={password}
                    autoCapitalize='none'
                    onChangeText={onChangePassword}
                    rightIconName='remove-red-eye'
                    secureTextEntry
                    onSubmitEditing={onLogin}
                />
                <Spacer height={20} />
                <Button
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
        </View>
    );
};

export default LoginGeneral;
