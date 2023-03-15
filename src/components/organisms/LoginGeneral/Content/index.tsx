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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootScreensParamsList } from 'src/navigators/types';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';
import EmailVerificationPopup from './EmailVerificationPopup';

const { colors, scale } = theme;

interface Errors {
    emailError: string;
    passwordError: string;
}

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Content = () => {
    const navigation = useNavigation<NavigationProp<RootScreensParamsList>>();
    const { setUserAuth } = useUserStore();
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
            isEmailValidated();
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
                    onResetFields();
                    /* If user comes 1st time, will navigate to ResetPw */
                    if (result.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        navigation.navigate('ResetPw', {
                            resetType: 'INITIAL',
                            user: result.user,
                        });
                    } else {
                        setUserAuth({ loading: true, type: 'general' });
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
                testIdInput={`${TID}INPUT_EMAIL`}
                label='Enter work email'
                placeholder=''
                autoCapitalize='none'
                containerStyle={styles.inputContainer}
                value={email}
                error={errors.emailError !== ''}
                onSubmitEditing={onSubmitEmail}
                onChangeText={onChangeEmail}
            />
            {errors.emailError !== '' && (
                <Text
                    testID={`${TID}TEXT_EMAIL_ERROR`}
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.emailError}
                </Text>
            )}
            <Spacer height={scale.sc1} />
            <Input
                testIdInput={`${TID}INPUT_PW`}
                reference={passwordRef}
                label='Enter password'
                placeholder=''
                autoCapitalize='none'
                rightIconName={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconColor={colors.gray}
                error={errors.passwordError !== ''}
                containerStyle={styles.inputContainer}
                secureTextEntry={hidePassword}
                value={password}
                onSubmitEditing={onSignin}
                onPressRightIcon={onToggleHidePassword}
                onChangeText={onChangePassword}
            />
            {errors.passwordError !== '' && (
                <Text
                    testID={`${TID}TEXT_PW_ERROR`}
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.passwordError}
                </Text>
            )}
            <Spacer height={scale.sc1} />
            <LALinkText
                testIdText={`${TID}LINK_FORGOT_PW`}
                text='Forgot Password ?'
                onPress={onOpenEmailVerifyPopup}
            />
            <Spacer height={scale.sc20} />
            <Button
                testIdLabel={`${TID}BUTTON_LOGIN`}
                loading={loading}
                label='Login'
                onPress={onSignin}
                iconPosition='left'
                icon='arrow-forward'
            />

            {/* For Forgot PW */}
            <EmailVerificationPopup
                openPopup={openEmailVerifyPopup}
                emailRegex={EMAIL_REGEX}
                onClosePopup={onCloseEmailVerifyPopup}
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
