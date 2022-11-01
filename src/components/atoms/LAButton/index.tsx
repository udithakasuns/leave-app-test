/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Pressable,
    PressableProps,
    StyleProp,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { Circle as ProgressBar } from 'react-native-progress';
import theme from '../../../utils/theme';
import { AtLeast, TestProps } from '../../../utils/types';
import LAIcon, { IconSize } from '../LAIcon';
import LAText, { TextType } from '../LAText';
import styles from './styles';
import { AlignType, ButtonMode, ButtonSize } from './types';

const { scale } = theme;

interface Props extends PressableProps, TestProps {
    label: string;
    labelType: TextType;
    onPress: () => void;
    alignContent: AlignType;
    mode: ButtonMode;
    size: ButtonSize;
    loading: boolean;
    buttonStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    icon: string;
    iconColor: string;
    iconPosition: 'right' | 'left';
    iconSize: IconSize;
    testID: string;
}

const LAButton = ({
    label,
    onPress,
    mode = 'contained',
    size = 'large',
    icon,
    iconSize = IconSize.medium,
    iconPosition = 'right',
    iconColor,
    buttonStyle,
    labelStyle,
    labelType = 'body1',
    alignContent = 'center',
    testID,
    loading,
    ...rest
}: AtLeast<Props, 'label' | 'onPress'>) => {
    const {
        buttonContainer,
        labelContainer,
        IconLabelContainer,
        rightIcon,
        leftIcon,
        loadingContainer,
    } = styles(mode, alignContent, size);

    return (
        <Pressable
            disabled={loading}
            {...rest}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1.0 },
                buttonContainer,
                buttonStyle,
            ]}
            testID={testID}
            onPress={onPress}>
            {!loading ? (
                <View style={IconLabelContainer}>
                    {icon && iconPosition === 'right' && (
                        <LAIcon
                            name={icon}
                            size={iconSize}
                            color={iconColor}
                            style={rightIcon}
                        />
                    )}
                    <LAText
                        style={[labelContainer, labelStyle]}
                        type={labelType}>
                        {label}
                    </LAText>
                    {icon && iconPosition === 'left' && (
                        <LAIcon
                            name={icon}
                            size={iconSize}
                            color={iconColor}
                            style={leftIcon}
                        />
                    )}
                </View>
            ) : (
                <ProgressBar
                    testID={rest.testLoadingID}
                    color={loadingContainer.color as string}
                    borderWidth={2}
                    size={scale.sc20}
                    indeterminate
                />
            )}
        </Pressable>
    );
};

export default LAButton;
