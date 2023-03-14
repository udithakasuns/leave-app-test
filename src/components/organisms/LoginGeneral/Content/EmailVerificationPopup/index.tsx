import { NavigationProp, useNavigation } from '@react-navigation/native';
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
import { RootScreensParamsList } from 'src/navigators/types';
import { awsOnForgotpwEmailSubmit } from 'src/services/aws';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale, colors } = theme;

interface Props {
    openPopup: boolean;
    emailRegex: RegExp;
    onClosePopup: () => void;
}

const EmailVerificationPopup = ({
    openPopup,
    emailRegex,
    onClosePopup,
}: Props) => {
    const navigation = useNavigation<NavigationProp<RootScreensParamsList>>();

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
            awsOnForgotpwEmailSubmit(email)
                .then(res => {
                    setLoading(false);
                    if (res.isSuccess) {
                        onClosePopup();
                        onResetField();
                        navigation.navigate('ResetPw', {
                            resetType: 'FORGOT_PW',
                            userEmail: email,
                        });
                    } else {
                        setEmailError(res.message);
                    }
                })
                .catch(() => {
                    setEmailError(
                        'Something went wrong! Please contact your admin',
                    );
                });
        }
    };

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
                    onSubmitEditing={onSubmitEmail}
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
                    loading={loading}
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
