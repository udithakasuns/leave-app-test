/* eslint-disable react/destructuring-assignment */
import React, { useState, createRef, LegacyRef, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import {
    LAPasswordStrength,
    LAPasswordStrengthRule as Rule,
} from 'src/components/molecules';
import { RootScreensParamsList } from 'src/navigators/types';
import { awsOnForgotPwSubmit, awsOnResetInitialPw } from 'src/services/aws';
import { GeneralSigninUser } from 'src/services/aws/types';
import { showErrorToast, toastConfig } from 'src/utils/alerts';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { styles } from './styles';
import VerificationCode from './VerificationCode';
import {
    defaultRules,
    defaultCodeValues,
    defaultErrors,
    Errors,
    defaultApiErrorMsg,
    errorMap,
} from './helper';

const { colors, scale } = theme;

type Props = {
    route: RouteProp<RootScreensParamsList, 'ResetPw'>;
    onNavigateToResetPwSuccess: () => void;
};

const PasswordContent = ({
    route: { params },
    onNavigateToResetPwSuccess,
}: Props) => {
    const [rules, setRules] = useState<Rule[]>(defaultRules);
    const [codeValues, setCodeValues] = useState<string[]>(defaultCodeValues);
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [cPassword, setCpassword] = useState<string>('');
    const [hideCpassword, setHideCpassword] = useState<boolean>(true);
    const [errors, setErrors] = useState<Errors>(defaultErrors);
    const [loading, setLoading] = useState<boolean>(false);

    const passwordRef: LegacyRef<TextInput> = createRef();
    const cPasswordRef: LegacyRef<TextInput> = createRef();

    const isCodeValidated = (): boolean => {
        if (codeValues.some(value => value === '')) {
            setErrors({ ...errors, codeError: 'Invalid code!' });
            return false;
        }
        return true;
    };

    const isPwValidated = (): boolean => {
        if (password.length === 0) {
            setErrors({ ...errors, pwError: 'Please enter the password' });
            return false;
        }
        const notMatchedRule = rules.find(rule => !rule.isMatched);
        if (notMatchedRule) {
            const { key } = notMatchedRule;
            setErrors({ ...errors, pwError: errorMap[key] });
            return false;
        }
        return true;
    };

    const isCpwValidated = (): boolean => {
        if (cPassword.length === 0) {
            setErrors({
                ...errors,
                cPwError: 'Please enter the correct password',
            });
            return false;
        }
        if (password !== cPassword) {
            setErrors({
                ...errors,
                cPwError: 'Passwords do not match',
            });
            return false;
        }
        return true;
    };

    const onToggleHidePassword = () => setHidePassword(prevState => !prevState);

    const onToggleHideCpassword = () =>
        setHideCpassword(prevState => !prevState);

    const onChangeCodeValue = (value: string, index: number) => {
        setErrors({ ...errors, codeError: '' });
        codeValues[index] = value;
        setCodeValues([...codeValues]);
    };

    const onChangePassword = (text: string) => {
        setErrors({ ...errors, pwError: '' });
        setPassword(text);
    };

    const onChangeCpassword = (text: string) => {
        setErrors({ ...errors, cPwError: '' });
        isPwValidated();
        setCpassword(text);
    };

    const onUpdateRules = (updatedRules: Rule[]) => setRules(updatedRules);

    const onSubmitCode = () => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    };

    const onSubmitPassword = () => {
        if (cPasswordRef && cPasswordRef.current) {
            cPasswordRef.current.focus();
        }
    };

    const onResetFields = () => {
        if (params.resetType === 'FORGOT_PW') {
            setCodeValues([...defaultCodeValues]);
        }
        setPassword('');
        setCpassword('');
    };

    const onSuccessResetPw = () => {
        setLoading(false);
        onResetFields();
        onNavigateToResetPwSuccess();
    };

    const onFailResetPw = (message: string = defaultApiErrorMsg) => {
        setLoading(false);
        showErrorToast(ErrorCodes.RESET_PW_ERROR, message);
    };

    const onResetInitialPw = (user: GeneralSigninUser) => {
        if (isPwValidated() && isCpwValidated()) {
            setLoading(true);
            awsOnResetInitialPw(user, password)
                .then(res => {
                    if (res.isSuccess) onSuccessResetPw();
                    else onFailResetPw(res.message);
                })
                .catch(() => onFailResetPw());
        }
    };

    const onResetForgotPw = (userEmail: string) => {
        if (isCodeValidated() && isPwValidated() && isCpwValidated()) {
            setLoading(true);
            const code = codeValues.join('');
            awsOnForgotPwSubmit(userEmail, code, password)
                .then(res => {
                    if (res.isSuccess) onSuccessResetPw();
                    else onFailResetPw(res.message);
                })
                .catch(() => onFailResetPw());
        }
    };

    const onPressResetPw = () => {
        if (params.resetType === 'INITIAL') {
            onResetInitialPw(params.user);
        } else if (params.resetType === 'FORGOT_PW') {
            onResetForgotPw(params.userEmail);
        }
    };

    useEffect(() => {
        onResetFields();
    }, []);

    return (
        <>
            {params.resetType === 'FORGOT_PW' && (
                <VerificationCode
                    codeValues={codeValues}
                    codeError={errors.codeError}
                    resendEmail={params.userEmail}
                    onChangeCodeValue={onChangeCodeValue}
                    onSubmitCode={onSubmitCode}
                    onFailResetPw={onFailResetPw}
                />
            )}
            <Input
                testIdInput={`${TID}INPUT_PASSWORD`}
                reference={passwordRef}
                label='New password'
                placeholder=''
                value={password}
                autoCapitalize='none'
                rightIconName={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconColor={colors.gray}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputContainer}
                onSubmitEditing={onSubmitPassword}
                onChangeText={onChangePassword}
                onPressRightIcon={onToggleHidePassword}
                error={errors.pwError !== ''}
            />
            {errors.pwError !== '' && (
                <Text
                    testID={`${TID}TEXT_PW_ERROR`}
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.pwError}
                </Text>
            )}
            <Spacer height={scale.sc1} />
            <LAPasswordStrength
                password={password}
                rules={rules}
                onUpdateRules={onUpdateRules}
            />
            <Spacer height={scale.sc6} />
            <Input
                testIdInput={`${TID}INPUT_C_PASSWORD`}
                reference={cPasswordRef}
                label='Confirm new password'
                placeholder=''
                value={cPassword}
                autoCapitalize='none'
                onChangeText={onChangeCpassword}
                rightIconName={
                    hideCpassword ? 'eye-outline' : 'eye-off-outline'
                }
                rightIconColor={colors.gray}
                secureTextEntry={hideCpassword}
                onSubmitEditing={onPressResetPw}
                containerStyle={styles.inputContainer}
                onPressRightIcon={onToggleHideCpassword}
                error={errors.cPwError !== ''}
            />
            {errors.cPwError !== '' && (
                <Text
                    testID={`${TID}TEXT_PW_ERROR`}
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.cPwError}
                </Text>
            )}
            <Spacer height={scale.sc6} />
            <Button
                testIdLabel={`${TID}BUTTON_RESET_PW`}
                loading={loading}
                iconPosition='left'
                icon='arrow-forward'
                label='Reset password'
                onPress={onPressResetPw}
                buttonStyle={styles.buttonReset}
            />
        </>
    );
};

export default PasswordContent;
