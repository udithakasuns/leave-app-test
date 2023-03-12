/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    ViewStyle,
    Pressable,
} from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, IconLibrary, TestProps } from 'src/utils/types';
import LAIcon, { IconSize } from '../LAIcon';
import LAText from '../LAText';
import inputStyles from './styles';
import { InputTypes } from './types';

const { colors } = theme;
export interface Props extends TextInputProps, TestProps {
    reference: React.LegacyRef<TextInput>;
    placeholder: string;
    placeholderColor: string;
    containerStyle: ViewStyle;
    inputContainerStyle: ViewStyle;
    type: InputTypes;
    label: string;
    error: boolean;
    editable: boolean;
    caption: string;
    disabled: boolean;
    leftIconName: string;
    leftIconSize: number;
    leftIconColor: string;
    leftIconLibrary: IconLibrary;
    rightIconName: string;
    rightIconSize: number;
    rightIconColor: string;
    rightIconLibrary: IconLibrary;
    onPressLeftIcon: () => void;
    onPressRightIcon: () => void;
}
const LAInput = ({
    reference,
    containerStyle,
    inputContainerStyle,
    type = 'DEFAULT',
    label,
    placeholder,
    disabled = false,
    editable,
    error = false,
    value,
    leftIconName,
    leftIconColor,
    leftIconSize,
    leftIconLibrary = 'community',
    rightIconName,
    rightIconColor,
    rightIconSize,
    rightIconLibrary = 'community',
    caption,
    testIdcontainer,
    testIdInputContainer,
    testIdLabel,
    testIdInput,
    testIdLeftIcon,
    testIdRightIcon,
    testIdCaption,
    placeholderColor,
    onPressLeftIcon,
    onPressRightIcon,
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
        disabled
            ? colors.disabledColor
            : error
            ? colors.error
            : placeholderColor ?? colors.gray;
    const getLeftIconColor = () =>
        disabled
            ? colors.disabledColor
            : error
            ? colors.error
            : leftIconColor || focused
            ? colors.gray
            : colors.gray;
    const getRightIconColor = () =>
        disabled
            ? colors.disabledColor
            : error
            ? colors.error
            : rightIconColor || focused
            ? colors.gray
            : colors.gray;
    if (type === 'COMMENT') {
        return (
            <View
                testID={testIdcontainer}
                style={[styles.container, containerStyle]}>
                <LAText
                    testID={testIdLabel}
                    type='ParaLG'
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
                        editable={editable ?? !disabled}
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
            {label !== '' && (
                <Pressable onPress={onPressLeftIcon}>
                    <LAText
                        testID={testIdLabel}
                        type='SubH'
                        color={styles.label.color}>
                        {label}
                    </LAText>
                </Pressable>
            )}
            <View
                testID={testIdInputContainer}
                style={[styles.inputContainer, inputContainerStyle]}>
                {leftIconName && (
                    <LAIcon
                        testId={testIdLeftIcon}
                        name={leftIconName}
                        color={getLeftIconColor()}
                        size={leftIconSize || getIconSize()}
                        library={leftIconLibrary}
                    />
                )}
                <TextInput
                    {...rest}
                    testID={testIdInput}
                    ref={reference}
                    editable={editable ?? !disabled}
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={getPlaceholderTextColor()}
                    value={value}
                    onFocus={onToggleFocus}
                    onBlur={onToggleFocus}
                />
                {rightIconName && (
                    <Pressable onPress={onPressRightIcon}>
                        <LAIcon
                            testId={testIdRightIcon}
                            name={rightIconName}
                            color={getRightIconColor()}
                            size={rightIconSize || getIconSize()}
                            library={rightIconLibrary}
                        />
                    </Pressable>
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
