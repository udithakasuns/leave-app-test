/* eslint-disable no-useless-escape */
import React, { useState, LegacyRef, createRef } from 'react';
import { TextInput } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
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

interface Errors {
    emailError: string;
    passwordError: string;
}

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Content = ({ onNavigateToResetPw, onNavigateToForgotPw }: Props) => {
    const { setAuthLoading } = useUserStore();
    const passwordRef: LegacyRef<TextInput> = createRef();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({
        emailError: '',
        passwordError: '',
    });
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [openEmailVerifyPopup, setOpenEmailVerifyPopup] =
        useState<boolean>(false);

    const onChangeEmail = (text: string) => {
        setErrors({ ...errors, emailError: '' });
        setEmail(text);
    };
    const onChangePassword = (text: string) => {
        setErrors({ ...errors, passwordError: '' });
        setPassword(text);
    };

    const isEmailValidated = (): boolean => {
        if (email.length === 0) {
            setErrors({ ...errors, emailError: 'Please enter the email' });
            return false;
        }
        if (!EMAIL_REGEX.test(email)) {
            setErrors({ ...errors, emailError: 'Please enter a valid email' });
            return false;
        }
        return true;
    };

    const isPasswordValidated = (): boolean => {
        if (password.length === 0) {
            setErrors({
                ...errors,
                passwordError: 'Please enter the password',
            });
            return false;
        }
        return true;
    };

    const onSubmitEmail = () => {
        if (passwordRef && passwordRef.current) {
            isPasswordValidated();
            passwordRef.current.focus();
        }
    };

    const onToggleHidePassword = () => setHidePassword(prevState => !prevState);

    const onResetFields = () => {
        setTimeout(() => {
            setEmail('');
            setPassword('');
        }, 100);
    };

    const onSignin = async () => {
        if (isEmailValidated() && isPasswordValidated()) {
            setLoading(true);
            try {
                const result = await awsOnGeneralSignIn(email, password);
                setLoading(false);
                if (result.isSuccess) {
                    /* If user comes 1st time, will navigate to ResetPw */
                    if (result.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        onNavigateToResetPw(result.user);
                    } else {
                        onResetFields();
                        setAuthLoading(true);
                    }
                } else {
                    const { message } = result;
                    showErrorToast(ErrorCodes.GENERAL_SIGNIN_ERROR, message);
                }
            } catch {
                setLoading(false);
                const message =
                    'Something went wrong! Please contact your admin.';
                showErrorToast(ErrorCodes.GENERAL_SIGNIN_ERROR, message);
            }
        }
    };

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
                error={errors.emailError !== ''}
                containerStyle={styles.inputContainer}
            />
            {errors.emailError !== '' && (
                <Text
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.emailError}
                </Text>
            )}
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
                error={errors.passwordError !== ''}
                onPressRightIcon={onToggleHidePassword}
                containerStyle={styles.inputContainer}
            />
            {errors.passwordError !== '' && (
                <Text
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.passwordError}
                </Text>
            )}
            <Spacer height={scale.sc1} />
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
                autoHide
            />
        </>
    );
};

export default Content;
