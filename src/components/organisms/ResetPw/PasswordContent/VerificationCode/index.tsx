import React from 'react';
import { Button } from 'src/components/atoms';
import CodeInput from 'src/components/molecules/LACodeInput';
import { awsOnForgotpwEmailSubmit } from 'src/services/aws';
import { styles } from './styles';

interface Props {
    codeValues: string[];
    codeError: string;
    resendEmail: string;
    onChangeCodeValue: (value: string, index: number) => void;
    onSubmitCode: () => void;
}

const VerificationCode = ({
    codeValues,
    codeError,
    resendEmail,
    onChangeCodeValue,
    onSubmitCode,
}: Props) => {
    const onResendCode = async () => {
        try {
            await awsOnForgotpwEmailSubmit(resendEmail);
        } catch {
            // Handle the error
        }
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
                size='small'
                iconPosition='left'
                icon='arrow-forward'
                label='Resend code'
                buttonStyle={styles.button}
                onPress={onResendCode}
            />
        </>
    );
};

export default VerificationCode;
