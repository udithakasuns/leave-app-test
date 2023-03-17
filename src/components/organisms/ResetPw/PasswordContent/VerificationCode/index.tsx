import React, { useState, useEffect } from 'react';
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

    const getResendText = (): string => {
        if (seconds !== 0) {
            return `You can resend a code in ${seconds}s`;
        }
        return '';
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

            <Button
                testIdLabel={`${TID}BUTTON_RESEND_CODE`}
                disabled={isButtonDisabled}
                mode={isButtonDisabled ? 'contained-gray' : 'contained'}
                size='small'
                iconPosition='left'
                icon='arrow-forward'
                label={loading ? 'Resending...' : 'Resend code'}
                onPress={onResendCode}
            />

            <Text
                style={styles.resentText}
                testID={`${TID}TEXT_RESEND`}
                type='ParaSM'>
                {getResendText()}
            </Text>
        </>
    );
};

export default VerificationCode;
