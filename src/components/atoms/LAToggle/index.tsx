/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, SwitchProps } from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';

const { colors } = theme;

const LAToggle = ({
    value,
    onValueChange,
    thumbColor = colors.white,
    trackColor = { false: colors.gray400, true: colors.approved },
    ios_backgroundColor = colors.gray400,
    ...rest
}: AtLeast<SwitchProps, 'value' | 'onValueChange'>) => (
    <Switch
        thumbColor={thumbColor}
        trackColor={trackColor}
        ios_backgroundColor={ios_backgroundColor}
        value={value}
        onValueChange={onValueChange}
        {...rest}
    />
);

export default LAToggle;
