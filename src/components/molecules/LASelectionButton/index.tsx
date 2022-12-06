/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, IconSize } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, IconLibrary, TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    label: string;
    onPress: () => void;
    isSelected: boolean;
    isDisable: boolean;
    isError: boolean;
    icon: string;
    selectedIcon: string;
    iconSize: IconSize;
    buttonStyle: StyleProp<ViewStyle>;
    iconLibrary: IconLibrary;
}

const LASelectionButton = ({
    testId,
    label,
    isSelected = false,
    isDisable = false,
    isError = false,
    onPress,
    icon = 'arrow-forward',
    selectedIcon = 'check-circle',
    iconSize,
    buttonStyle,
    iconLibrary = 'material',
}: AtLeast<Props, 'label' | 'onPress'>) => (
    <Button
        testID={testId}
        label={label}
        isDisable={isDisable}
        mode={
            isSelected
                ? 'outlined'
                : isError
                ? 'outlined-light-error'
                : 'contained-gray'
        }
        icon={isSelected ? selectedIcon : icon}
        iconLibrary={iconLibrary}
        iconPosition='left'
        iconSize={iconSize}
        iconColor={
            isSelected
                ? colors.green700
                : isError
                ? colors.error
                : colors.tertiaryLabel
        }
        iconLabelContainerStyle={styles.iconLabelContainer}
        buttonStyle={[styles.buttonContainer, buttonStyle]}
        onPress={onPress}
    />
);
export default LASelectionButton;
