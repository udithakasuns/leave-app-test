import React from 'react';
import { Button, IconSize } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    label: string;
    onPress: () => void;
    isSelected: boolean;
    icon: string;
    selectedIcon: string;
    iconSize: IconSize;
}

const LASelectionButton = ({
    testId,
    label,
    isSelected = false,
    onPress,
    icon = 'arrow-forward',
    selectedIcon = 'check-circle',
    iconSize,
}: AtLeast<Props, 'label' | 'onPress'>) => (
    <Button
        testID={testId}
        label={label}
        mode={isSelected ? 'outlined' : 'contained-gray'}
        icon={isSelected ? selectedIcon : icon}
        iconPosition='left'
        iconSize={iconSize}
        iconColor={isSelected ? colors.green700 : colors.tertiaryLabel}
        iconLabelContainerStyle={styles.iconLabelContainer}
        buttonStyle={styles.buttonContainer}
        onPress={onPress}
    />
);
export default LASelectionButton;
