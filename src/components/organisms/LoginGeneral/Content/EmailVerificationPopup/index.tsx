import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import {
    Button,
    Divider,
    Icon,
    IconSize,
    Input,
    Spacer,
    Text,
} from 'src/components/atoms';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale, colors } = theme;

interface Props {
    openPopup: boolean;
    emailRegex: RegExp;
    onClosePopup: () => void;
    onNavigateToForgotPw: () => void;
}

const EmailVerificationPopup = ({
    openPopup,
    emailRegex,
    onClosePopup,
    onNavigateToForgotPw,
}: Props) => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const onChangeEmail = (text: string) => setEmail(text);

    const isEmailValidated = (): boolean => {
        if (email.length === 0) {
            setEmailError('Please enter the email');
            return false;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email');
            return false;
        }
        return true;
    };

    const onResetField = () => {
        setTimeout(() => {
            setEmail('');
        }, 100);
    };

    const onSubmitEmail = () => {
        if (isEmailValidated()) {
            // Call to the API
            // Remember to reset field
        }
    };

    // need to add basic email validation regex

    return (
        <Modal
            style={styles.modal}
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={openPopup}
            avoidKeyboard
            useNativeDriver>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text type='H1Bold'>Forgot Password</Text>
                    <Icon
                        name='close'
                        enableBackground
                        size={IconSize.medium}
                        increasePadding={2}
                        onPress={onClosePopup}
                    />
                </View>
                <Spacer height={scale.sc2} />
                <Divider />
                <Spacer height={scale.sc10} />
                <Text type='SubH'>
                    Enter your work email and we’ll send you a verification code
                    to reset your password
                </Text>
                <Spacer height={scale.sc10} />
                <Input
                    label='Work email'
                    placeholder=''
                    value={email}
                    autoCapitalize='none'
                    onChangeText={onChangeEmail}
                    containerStyle={styles.inputContainer}
                />
                {emailError !== '' && (
                    <Text
                        style={styles.errorText}
                        color={colors.error}
                        type='ParaSM'>
                        {emailError}
                    </Text>
                )}
                <Spacer height={scale.sc10} />
                <Button
                    label='Send verification code'
                    iconPosition='left'
                    icon='arrow-forward'
                    onPress={onSubmitEmail}
                />
            </View>
        </Modal>
    );
};

export default EmailVerificationPopup;
