import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Spacer } from 'src/components/atoms';
import { LALinkText } from 'src/components/molecules';
import CodeInput from 'src/components/molecules/LACodeInput';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale } = theme;

const defaultCodeValues: string[] = ['', '', '', '', '', ''];

interface Props {
    onNavigateToGeneralLogin: () => void;
    onNavigateToSocialLogin: () => void;
}

const Content = ({
    onNavigateToGeneralLogin,
    onNavigateToSocialLogin,
}: Props) => {
    const [codeValues, setCodeValues] = useState<string[]>(defaultCodeValues);
    const [error, setError] = useState<string>('');

    const onChangeCodeValue = (value: string, index: number) => {
        setError('');
        codeValues[index] = value;
        setCodeValues([...codeValues]);
    };

    const onPressSubmit = () => {
        if (codeValues.some(value => value === '')) {
            setError('Invalid code!');
        } else {
            // handle submit here
            onNavigateToGeneralLogin();
        }
    };

    return (
        <View>
            <Spacer height={scale.sc20} />
            <CodeInput
                codeValues={codeValues}
                title='Organization provider code'
                error={error}
                onChangeCodeValue={onChangeCodeValue}
                onAutoSubmit={onPressSubmit}
            />
            <Spacer height={scale.sc10} />
            <Button
                testIdLabel={`${TID}BUTTON_PROCEED_TO_LOGIN`}
                label='Proceed to Log in'
                onPress={onPressSubmit}
            />
            <Spacer height={scale.sc6} />
            <LALinkText
                testIdText={`${TID}LINK_TEXT_LOGIN`}
                containerStyle={styles.linkTextContainer}
                text='Log in with Google Account'
                onPress={onNavigateToSocialLogin}
            />
        </View>
    );
};

export default Content;
