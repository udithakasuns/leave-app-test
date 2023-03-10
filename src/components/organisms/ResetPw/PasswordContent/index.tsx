/* eslint-disable react/destructuring-assignment */
import React, { useState, createRef, LegacyRef } from 'react';
import { TextInput } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import {
    LAPasswordStrength,
    LAPasswordStrengthRuleKey as RuleKey,
    LAPasswordStrengthRule as Rule,
} from 'src/components/molecules';
import { awsOnResetInitialPw } from 'src/services/aws';
import { GeneralSigninUser } from 'src/services/aws/types';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors, scale } = theme;

type InitialPwResetProps = {
    pwResetType: 'initial';
    user: GeneralSigninUser;
};

type GeneralPwResetProps = {
    pwResetType: 'general';
};

type Props = InitialPwResetProps | GeneralPwResetProps;

interface Errors {
    pwError: string;
    cPwError: string;
}

type ErrorMap = {
    [key in RuleKey]: string;
};

const defaultRules: Rule[] = [
    {
        key: 'LOWER_CASE',
        text: 'Lower case character',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'UPPER_CASE',
        text: 'Upper case character',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'ONE_NUMBER',
        text: 'One number',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'EIGHT_CHARACTER',
        text: '8 Characters or above',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'SPECEAL_CHARACTER',
        text: 'One special character (@,$,%)',
        isMatched: false,
        color: colors.black,
    },
];

const errorMap: ErrorMap = {
    LOWER_CASE: 'New password must contain at least one lowercase character',
    UPPER_CASE: 'New password must contain at least one uppercase character',
    ONE_NUMBER: 'New password must contain at least one number',
    EIGHT_CHARACTER: 'New password must be at least 8 characters long',
    SPECEAL_CHARACTER:
        'New password must contain at least one special character[@,$,%]',
};

const PasswordContent = (props: Props) => {
    const [rules, setRules] = useState<Rule[]>(defaultRules);
    const [password, setPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [cPassword, setCpassword] = useState<string>('');
    const [hideCpassword, setHideCpassword] = useState<boolean>(true);
    const [errors, setErrors] = useState<Errors>({ pwError: '', cPwError: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const cPasswordRef: LegacyRef<TextInput> = createRef();

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

    const onSubmitPassword = () => {
        if (cPasswordRef && cPasswordRef.current) {
            cPasswordRef.current.focus();
        }
    };

    const onPressResetPw = () => {
        if (isPwValidated() && isCpwValidated()) {
            if (props.pwResetType === 'initial') {
                setLoading(true);
                awsOnResetInitialPw(props.user, password)
                    .then(() => {
                        setPassword('');
                        setCpassword('');
                        setLoading(false);
                        // If navigate to home, call to setAuthloading(true);
                    })
                    .catch(() => {
                        setLoading(false);
                    });
            }

            // Remember to clean the fields
        }
    };

    return (
        <>
            <Spacer height={scale.sc20} />
            <Input
                testIdInput={`${TID}INPUT_PASSWORD`}
                label='New password'
                placeholder=''
                value={password}
                autoCapitalize='none'
                onChangeText={onChangePassword}
                rightIconName={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                rightIconColor={colors.gray}
                secureTextEntry={hidePassword}
                onSubmitEditing={onSubmitPassword}
                containerStyle={styles.inputContainer}
                onPressRightIcon={onToggleHidePassword}
                error={errors.pwError !== ''}
            />
            {errors.pwError !== '' && (
                <Text
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
                onSubmitEditing={() => {}}
                containerStyle={styles.inputContainer}
                onPressRightIcon={onToggleHideCpassword}
                error={errors.cPwError !== ''}
            />
            {errors.cPwError !== '' && (
                <Text
                    style={styles.errorText}
                    color={colors.error}
                    type='ParaSM'>
                    {errors.cPwError}
                </Text>
            )}
            <Spacer height={scale.sc6} />
            <Button
                loading={loading}
                testIdLabel={`${TID}BUTTON_RESET_PW`}
                iconPosition='left'
                icon='arrow-forward'
                label='Reset password'
                onPress={onPressResetPw}
                buttonStyle={styles.button}
            />
        </>
    );
};

export default PasswordContent;
