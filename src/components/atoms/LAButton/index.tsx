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
import {
    AtLeast,
    IconLibrary,
    TestProps,
    TextTypeProps,
} from '../../../utils/types';
import LAIcon, { IconSize } from '../LAIcon';
import LAText from '../LAText';
import styles from './styles';
import { AlignType, ButtonMode, ButtonSize, PropertiesBySize } from './types';

const { scale } = theme;

export interface Props extends PressableProps, TestProps {
    label: string;
    labelType: TextTypeProps;
    onPress: () => void;
    alignContent: AlignType;
    mode: ButtonMode;
    size: ButtonSize;
    loading: boolean;
    buttonStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    iconLabelContainerStyle: StyleProp<TextStyle>;
    icon: string;
    iconColor: string;
    iconPosition: 'right' | 'left';
    iconSize: IconSize;
    iconLibrary: IconLibrary;
    testID: string;
}

const LAButton = ({
    label,
    onPress,
    mode = 'contained',
    size = 'large',
    icon,
    iconSize,
    iconPosition = 'right',
    iconColor,
    buttonStyle,
    labelStyle,
    labelType,
    alignContent = 'center',
    iconLabelContainerStyle,
    iconLibrary,
    testID,
    loading,
    testIdLoading,
    testIdLabel,
    ...rest
}: AtLeast<Props, 'label' | 'onPress'>) => {
    const getPropertiesBySize = (): PropertiesBySize => {
        switch (size) {
            case 'large':
                return {
                    containerPadding: scale.vsc16,
                    iconSize: IconSize.medium,
                    labelType: 'ParaLG',
                };
            case 'medium':
                return {
                    containerPadding: scale.vsc12,
                    iconSize: IconSize.small,
                    labelType: 'ParaSM',
                };
            default:
                return {
                    containerPadding: scale.vsc10,
                    iconSize: IconSize.xSmall,
                    labelType: 'ParaXS',
                };
        }
    };

    const {
        buttonContainer,
        labelContainer,
        IconLabelContainer,
        rightIcon,
        leftIcon,
        loadingContainer,
    } = styles(
        mode,
        alignContent,
        getPropertiesBySize().containerPadding,
        iconColor,
    );

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
                <View style={[IconLabelContainer, iconLabelContainerStyle]}>
                    {icon && iconPosition === 'right' && (
                        <LAIcon
                            name={icon}
                            size={iconSize ?? getPropertiesBySize().iconSize}
                            color={iconColor ?? (rightIcon.color as string)}
                            library={iconLibrary}
                            style={rightIcon}
                        />
                    )}
                    <LAText
                        testID={testIdLabel}
                        style={[labelContainer, labelStyle]}
                        type={labelType ?? getPropertiesBySize().labelType}>
                        {label}
                    </LAText>
                    {icon && iconPosition === 'left' && (
                        <LAIcon
                            name={icon}
                            size={iconSize ?? getPropertiesBySize().iconSize}
                            color={iconColor ?? (leftIcon.color as string)}
                            library={iconLibrary}
                            style={leftIcon}
                        />
                    )}
                </View>
            ) : (
                <ProgressBar
                    testID={testIdLoading}
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
