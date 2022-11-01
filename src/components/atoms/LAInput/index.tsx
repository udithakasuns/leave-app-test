/* eslint-disable react/jsx-props-no-spreading */
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
    reference: React.LegacyRef<TextInput>;
    placeholder: string;
    containerStyle: ViewStyle;
    inputContainerStyle: ViewStyle;
    type: InputTypes;
    label: string;
    error: boolean;
    caption: string;
    disabled: boolean;
    leftIconName: string;
    leftIconSize: number;
    leftIconColor: string;
    rightIconName: string;
    rightIconSize: number;
    rightIconColor: string;
    testIdcontainer: string;
    testIdInputContainer: string;
    testIdLabel: string;
    testIdInput: string;
    testIdLeftIcon: string;
    testIdRightIcon: string;
    testIdCaption: string;
}

const LAInput = ({
    reference,
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
    testIdcontainer,
    testIdInputContainer,
    testIdLabel,
    testIdInput,
    testIdLeftIcon,
    testIdRightIcon,
    testIdCaption,
    ...rest
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
            <View
                testID={testIdcontainer}
                style={[styles.container, containerStyle]}>
                <LAText
                    testID={testIdLabel}
                    type='SubH'
                    color={styles.label.color}>
                    {label}
                </LAText>
                <View
                    testID={testIdInputContainer}
                    style={[styles.inputContainer, inputContainerStyle]}>
                    <TextInput
                        {...rest}
                        testID={testIdInput}
                        style={[styles.input, styles.commentInput]}
                        ref={reference}
                        multiline
                        editable={!disabled}
                        placeholder={placeholder}
                        placeholderTextColor={getPlaceholderTextColor()}
                        value={value}
                        onFocus={onToggleFocus}
                        onBlur={onToggleFocus}
                    />
                </View>
            </View>
        );
    }
    return (
        <View
            testID={testIdcontainer}
            style={[styles.container, containerStyle]}>
            <LAText testID={testIdLabel} type='SubH' color={styles.label.color}>
                {label}
            </LAText>
            <View
                testID={testIdInputContainer}
                style={[styles.inputContainer, inputContainerStyle]}>
                {leftIconName && (
                    <LAIcon
                        testID={testIdLeftIcon}
                        name={leftIconName}
                        color={getLeftIconColor()}
                        size={leftIconSize || getIconSize()}
                    />
                )}
                <TextInput
                    {...rest}
                    testID={testIdInput}
                    ref={reference}
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
                        testID={testIdRightIcon}
                        name={rightIconName}
                        color={getRightIconColor()}
                        size={rightIconSize || getIconSize()}
                    />
                )}
            </View>
            {caption && (
                <LAText
                    testID={testIdCaption}
                    type='ParaXS'
                    color={styles.caption.color}>
                    {caption}
                </LAText>
            )}
        </View>
    );
};

export default LAInput;
