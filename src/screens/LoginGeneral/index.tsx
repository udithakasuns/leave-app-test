import React, { useState, LegacyRef, createRef } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import { BackHeader } from 'src/components/molecules';
import Footer from 'src/components/organisms/Login/Footer';
import Header from 'src/components/organisms/Login/Header';
import { ForgotPwPopup } from 'src/components/organisms/LoginGeneral';
import { LoginGeneralScreenProps } from 'src/navigators/types';
import { awsOnGeneralSignIn } from 'src/services/aws';
import { useUserStore } from 'src/store';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const LoginGeneral: React.FC<LoginGeneralScreenProps> = ({ navigation }) => {
    const { setAuthLoading } = useUserStore();
    const passwordRef: LegacyRef<TextInput> = createRef();
    const [email, setEmail] = useState<string>('kalanaramesh.dev@gmail.com');
    const [password, setPassword] = useState<string>('8sCizmv|');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [openForgotPwPopup, setOpenForgotPwPopup] = useState<boolean>(false);

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

    const onOpenForgotPwPopup = () => setOpenForgotPwPopup(true);

    const onCloseForgotPwPopup = () => setOpenForgotPwPopup(false);

    const onGoBack = () => navigation.goBack();

    const onNavigateToForgotPw = () => navigation.navigate('ForgotPw');

    return (
        <View style={styles.container}>
            <BackHeader title='' onBackPress={onGoBack} />
            <ScrollView
                keyboardShouldPersistTaps='handled'
                automaticallyAdjustKeyboardInsets
                contentContainerStyle={styles.scrollView}>
                <Header description='Log into your account using your work email and password.' />
                <Input
                    label='Enter work email'
                    placeholder=''
                    value={email}
                    autoCapitalize='none'
                    onChangeText={onChangeEmail}
                    onSubmitEditing={onSubmitEmail}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                />
                <Input
                    reference={passwordRef}
                    label='Enter password'
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
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                    onPressRightIcon={onToggleHidePassword}
                />
                <TouchableOpacity onPress={onOpenForgotPwPopup}>
                    <Text
                        type='SubH'
                        style={styles.forgotPwText}
                        color={colors.gray600}>
                        Forgot Password ?
                    </Text>
                </TouchableOpacity>
                <Spacer height={20} />
                <Button
                    label='Login'
                    onPress={onLogin}
                    iconPosition='left'
                    icon='arrow-forward'
                />
            </ScrollView>
            <Footer />
            <ForgotPwPopup
                openPopup={openForgotPwPopup}
                onClosePopup={onCloseForgotPwPopup}
                onNavigateToForgotPw={onNavigateToForgotPw}
            />
        </View>
    );
};

export default LoginGeneral;
