/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { IconName, SvgIcon } from 'assets/icons';
import { AtLeast } from 'src/utils/types';
import theme from 'src/utils/theme';
import { styles } from './styles';
import { Icon, Text } from '../../atoms';

const { colors, scale } = theme;

interface Props extends PressableProps {
    label: string;
    iconName: IconName;
}

const LASocialButton = ({
    label,
    iconName,
    onPress,
    ...rest
}: AtLeast<Props, 'label' | 'iconName'>) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1.0 },
            styles.container,
        ]}
        {...rest}>
        <SvgIcon name={iconName} />
        <Text type='SubH' color={colors.secondaryLabel}>
            {label}
        </Text>
        <Icon
            size={scale.sc20}
            color={colors.secondaryLabel}
            name='arrow-forward'
        />
    </Pressable>
);

export default LASocialButton;
