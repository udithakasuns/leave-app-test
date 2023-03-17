/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StyleSheet, Text, TextProps, ColorValue } from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, TestProps, TextTypeProps } from '../../../utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends TextProps, TestProps {
    children: React.ReactNode;
    type: TextTypeProps;
    color: ColorValue;
    testID: string;
}

const LAText = ({
    style,
    children,
    numberOfLines,
    onPress,
    testID,
    color = colors.black,
    type = 'ParaLG',
    ...rest
}: AtLeast<Props, 'children'>) => (
    <Text
        style={StyleSheet.flatten([styles[`${type}`], { color }, style])}
        numberOfLines={numberOfLines}
        onPress={onPress}
        testID={testID}
        {...rest}>
        {children}
    </Text>
);

export default LAText;
