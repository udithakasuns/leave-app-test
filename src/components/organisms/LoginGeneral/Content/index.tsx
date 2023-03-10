import React, { useState, LegacyRef, createRef } from 'react';
import { TextInput } from 'react-native';
import { Button, Input, Spacer } from 'src/components/atoms';
import { LALinkText } from 'src/components/molecules';
import { awsOnGeneralSignIn } from 'src/services/aws';
import { useUserStore } from 'src/store';
import theme from 'src/utils/theme';
import { showErrorToast, toastConfig } from 'src/utils/alerts';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GeneralSigninUser } from 'src/services/aws/types';
import { styles } from './styles';
import EmailVerificationPopup from './EmailVerificationPopup';

const { colors, scale } = theme;

interface Props {
    onNavigateToResetPw: (user: GeneralSigninUser) => void;
    onNavigateToForgotPw: () => void;
}

const Content = ({ onNavigateToResetPw, onNavigateToForgotPw }: Props) => {
    const { setAuthLoading } = useUserStore();
    const passwordRef: LegacyRef<TextInput> = createRef();
    const [email, setEmail] = useState<string>('kalanaramesh.dev@gmail.com');
    const [password, setPassword] = useState<string>('MQ7TdOy?');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [openEmailVerifyPopup, setOpenEmailVerifyPopup] =
        useState<boolean>(false);

    const onChangeEmail = (text: string) => setEmail(text);
    const onChangePassword = (text: string) => setPassword(text);
    const onSubmitEmail = () => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    };

    const onToggleHidePassword = () => setHidePassword(prevState => !prevState);

    const onSignin = async () => {
        setLoading(true);
        try {
            const result = await awsOnGeneralSignIn(email, password);
            setLoading(false);
            if (result.isSuccess) {
                if (result.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    onNavigateToResetPw(result.user);
                } else {
                    setAuthLoading(true);
                }
            } else {
                const { message } = result;
                showErrorToast(ErrorCodes.GENERAL_SIGNIN_ERROR, message);
            }
        } catch {
            setLoading(false);
            const message = 'Something went wrong! Please contact your admin.';
            showErrorToast(ErrorCodes.GENERAL_SIGNIN_ERROR, message);
        }
    };

    /* Need to handle errors */

    const onOpenEmailVerifyPopup = () => setOpenEmailVerifyPopup(true);

    const onCloseEmailVerifyPopup = () => setOpenEmailVerifyPopup(false);

    return (
        <>
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
                rightIconName={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconColor={colors.gray}
                secureTextEntry={hidePassword}
                onSubmitEditing={onSignin}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
                onPressRightIcon={onToggleHidePassword}
            />
            <LALinkText
                text='Forgot Password ?'
                onPress={onOpenEmailVerifyPopup}
            />
            <Spacer height={scale.sc20} />
            <Button
                loading={loading}
                label='Login'
                onPress={onSignin}
                iconPosition='left'
                icon='arrow-forward'
            />

            <EmailVerificationPopup
                openPopup={openEmailVerifyPopup}
                onClosePopup={onCloseEmailVerifyPopup}
                onNavigateToForgotPw={onNavigateToForgotPw}
            />
            <Toast
                config={toastConfig}
                position='bottom'
                bottomOffset={0}
                autoHide={false}
            />
        </>
    );
};

export default Content;
