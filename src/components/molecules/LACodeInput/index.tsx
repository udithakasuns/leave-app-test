/* eslint-disable no-plusplus */
import React, { useState, createRef, useEffect } from 'react';
import { View, TextInputKeyPressEventData } from 'react-native';
import { Input, Spacer, Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

const { scale, colors } = theme;

interface Props {
    title: string;
    codeLength: number;
    codeValues: string[];
    error: string;
    onChangeCodeValue: (value: string, index: number) => void;
    onAutoSubmit: () => void;
}

const CodeInput = ({
    title,
    codeValues,
    codeLength = codeValues.length,
    error,
    onChangeCodeValue,
    onAutoSubmit,
}: AtLeast<Props, 'codeValues' | 'onChangeCodeValue'>) => {
    const [inputRefs, setInputRefs] = useState<any[]>([]);

    useEffect(() => {
        setInputRefs(refs =>
            [...Array(codeLength)].map((_, i) => refs[i] || createRef()),
        );
    }, [codeLength]);

    const onForwardInputFocus = (index: number) => {
        if (codeLength - 1 !== index) {
            inputRefs[index + 1].current.focus();
        } else if (onAutoSubmit) {
            onAutoSubmit();
        }
    };

    const onBackwardInputFocus = (index: number) => {
        if (index !== 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const onChangeText = (value: string, index: number) => {
        if (value.length === 0 || value.length === 1) {
            onChangeCodeValue(value, index);
        }

        if (value !== '') {
            onForwardInputFocus(index);
        }
    };

    const onPressBackspace = (
        event: TextInputKeyPressEventData,
        index: number,
    ) => {
        if (event.key === 'Backspace') {
            onBackwardInputFocus(index);
        }
    };

    return (
        <View>
            <Text testID={`${TID}_TEXT_PROVIDER_CODE_TITLE`} type='SubH'>
                {title}
            </Text>
            <View style={styles.content}>
                {codeValues.map((value, index) => (
                    <Input
                        testIdInput={`${TID}INPUT_PROVIDER_CODE_${index.toString()}`}
                        key={value + index.toString()}
                        reference={inputRefs[index]}
                        label=''
                        containerStyle={styles.inputView}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        placeholder=''
                        value={value}
                        onChangeText={text => onChangeText(text, index)}
                        onKeyPress={({ nativeEvent }) =>
                            onPressBackspace(nativeEvent, index)
                        }
                        keyboardType='numeric'
                    />
                ))}
            </View>
            <Spacer height={scale.sc1} />
            {error !== '' && (
                <Text type='ParaSM' color={colors.error}>
                    {error}
                </Text>
            )}
        </View>
    );
};

export default CodeInput;
