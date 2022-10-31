/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { View, TextInput, TextInputProps, ViewStyle } from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import LAIcon, { IconSize } from '../LAIcon';
import LAText from '../LAText';
import inputStyles from './styles';
import { InputTypes } from './types';

const { colors } = theme;

interface Props extends TextInputProps {
    // ref: React.LegacyRef<TextInput>;
    containerStyle: ViewStyle;
    inputContainerStyle: ViewStyle;
    type: InputTypes;
    label: string;
    error: boolean;
    caption: string;
    disabled: boolean;
    value: string | '';
    leftIconName: string;
    leftIconSize: number;
    leftIconColor: string;
    rightIconName: string;
    rightIconSize: number;
    rightIconColor: string;
}

const LAInput = ({
    // ref,
    containerStyle,
    inputContainerStyle,
    type = 'DEFAULT',
    label,
    placeholder,
    disabled = false,
    error = false,
    value,
    leftIconName,
    leftIconColor,
    leftIconSize,
    rightIconName,
    rightIconColor,
    rightIconSize,
    caption,
}: AtLeast<Props, 'label' | 'placeholder' | 'value'>) => {
    const [focused, setFocused] = useState<boolean>(false);

    const styles = inputStyles({ type, disabled, error, value, focused });
    const onToggleFocus = () => setFocused(prevState => !prevState);

    const getIconSize = () => {
        switch (type) {
            case 'LARGE':
                return IconSize.large;
            case 'SMALL':
                return IconSize.small;
            default:
                return IconSize.medium;
        }
    };

    const getPlaceholderTextColor = () =>
        disabled ? colors.disabledColor : error ? colors.error : colors.gray;

    const getLeftIconColor = () =>
        disabled
            ? colors.disabledColor
            : error
            ? colors.error
            : leftIconColor || focused
            ? colors.black
            : colors.gray;

    const getRightIconColor = () =>
        disabled
            ? colors.disabledColor
            : error
            ? colors.error
            : rightIconColor || focused
            ? colors.black
            : colors.gray;

    if (type === 'COMMENT') {
        return (
            <View style={[styles.container, containerStyle]}>
                <LAText style={styles.label}>{label}</LAText>
                <View style={[styles.inputContainer, inputContainerStyle]}>
                    <TextInput
                        // ref={ref}
                        multiline
                        style={[styles.input, styles.commentInput]}
                        placeholder={placeholder}
                        placeholderTextColor={getPlaceholderTextColor()}
                        onFocus={onToggleFocus}
                        onBlur={onToggleFocus}
                    />
                </View>
            </View>
        );
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <LAText style={styles.label}>{label}</LAText>
            <View style={[styles.inputContainer, inputContainerStyle]}>
                {leftIconName && (
                    <LAIcon
                        name={leftIconName}
                        color={getLeftIconColor()}
                        size={leftIconSize || getIconSize()}
                    />
                )}
                <TextInput
                    // ref={ref}
                    editable={!disabled}
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={getPlaceholderTextColor()}
                    value={value}
                    onFocus={onToggleFocus}
                    onBlur={onToggleFocus}
                />
                {rightIconName && (
                    <LAIcon
                        name={rightIconName}
                        color={getRightIconColor()}
                        size={rightIconSize || getIconSize()}
                    />
                )}
            </View>
            {caption && <LAText style={styles.caption}>{caption}</LAText>}
        </View>
    );
};

export default LAInput;
