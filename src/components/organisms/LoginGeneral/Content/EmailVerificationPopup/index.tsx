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
import { TID } from 'src/utils/testIds';
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
            setEmailError('');
        }, 100);
    };

    const onSuccessEmailSubmit = () => {
        onResetField();
        onClosePopup();
        navigation.navigate('ResetPw', {
            resetType: 'FORGOT_PW',
            userEmail: email,
        });
    };

    const onSubmitEmail = () => {
        if (isEmailValidated()) {
            setLoading(true);
            awsOnForgotpwEmailSubmit(email)
                .then(res => {
                    setLoading(false);
                    if (res.isSuccess) onSuccessEmailSubmit();
                    else setEmailError(res.message);
                })
                .catch(() => {
                    setEmailError(
                        'Something went wrong! Please contact your admin',
                    );
                });
        }
    };

    const onPressClose = () => {
        onResetField();
        onClosePopup();
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
                    <Text testID={`${TID}TEXT_TITLE_FORGOT_PW`} type='H1Bold'>
                        Forgot Password
                    </Text>
                    <Icon
                        name='close'
                        enableBackground
                        size={IconSize.medium}
                        increasePadding={2}
                        onPress={onPressClose}
                    />
                </View>
                <Spacer height={scale.sc2} />
                <Divider />
                <Spacer height={scale.sc10} />
                <Text testID={`${TID}TEXT_SUBTITLE_FORGOT_PW`} type='SubH'>
                    Enter your work email and we’ll send you a verification code
                    to reset your password
                </Text>
                <Spacer height={scale.sc10} />
                <Input
                    testIdInput={`${TID}INPUT_EMAIL`}
                    label='Work email'
                    placeholder=''
                    value={email}
                    autoCapitalize='none'
                    containerStyle={styles.inputContainer}
                    onChangeText={onChangeEmail}
                    onSubmitEditing={onSubmitEmail}
                />
                {emailError !== '' && (
                    <Text
                        testID={`${TID}TEXT_EMAIL_ERROR`}
                        style={styles.errorText}
                        color={colors.error}
                        type='ParaSM'>
                        {emailError}
                    </Text>
                )}
                <Spacer height={scale.sc10} />
                <Button
                    testIdLabel={`${TID}BUTTON_SEND_CODE`}
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
