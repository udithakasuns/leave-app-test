import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'src/components/atoms';
import CodeInput from 'src/components/molecules/LACodeInput';
import { awsOnForgotpwEmailSubmit } from 'src/services/aws';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';

interface Props {
    codeValues: string[];
    codeError: string;
    resendEmail: string;
    onChangeCodeValue: (value: string, index: number) => void;
    onSubmitCode: () => void;
    onFailResetPw: (message?: string) => void;
}

const VerificationCode = ({
    codeValues,
    codeError,
    resendEmail,
    onChangeCodeValue,
    onSubmitCode,
    onFailResetPw,
}: Props) => {
    const [seconds, setSeconds] = useState<number>(30);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isButtonDisabled) {
            const interval = setInterval(() => {
                if (seconds === 0) {
                    setIsButtonDisabled(false);
                } else {
                    setSeconds(secs => secs - 1);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
        return () => null;
    }, [isButtonDisabled, seconds]);

    const onResendCode = () => {
        setLoading(true);
        awsOnForgotpwEmailSubmit(resendEmail)
            .then(res => {
                setLoading(false);
                if (res.isSuccess) {
                    setSeconds(60);
                    setIsButtonDisabled(true);
                } else {
                    onFailResetPw(res.message);
                }
            })
            .catch(() => {
                setLoading(false);
                onFailResetPw();
            });
    };

    return (
        <>
            <CodeInput
                codeValues={codeValues}
                title='Verification code'
                error={codeError}
                onChangeCodeValue={onChangeCodeValue}
                onAutoSubmit={onSubmitCode}
            />
            <View style={styles.resendContainer}>
                {seconds !== 0 ? (
                    <Text
                        testID={`${TID}TEXT_RESEND`}
                        style={styles.resentText}
                        type='ParaLG'>
                        You can resend a code in {seconds}s
                    </Text>
                ) : (
                    <View />
                )}

                <Button
                    testIdLabel={`${TID}BUTTON_RESEND_CODE`}
                    disabled={isButtonDisabled}
                    mode={isButtonDisabled ? 'contained-gray' : 'contained'}
                    size='small'
                    iconPosition='left'
                    icon='arrow-forward'
                    label={loading ? 'Resending...' : 'Resend code'}
                    buttonStyle={styles.button}
                    onPress={onResendCode}
                />
            </View>
        </>
    );
};

export default VerificationCode;
