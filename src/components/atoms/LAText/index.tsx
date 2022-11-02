import React from 'react';
import { StyleSheet, Text, TextProps, ColorValue } from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from '../../../utils/types';
import { styles } from './styles';

const { colors } = theme;

export type TextType =
    | 'H1'
    | 'H1Bold'
    | 'H2'
    | 'H2Bold'
    | 'SubH'
    | 'SubHBold'
    | 'ParaLG'
    | 'ParaLGBold'
    | 'ParaSM'
    | 'ParaSMBold'
    | 'ParaXS'
    | 'ParaXSBold';

interface Props extends TextProps, TestProps {
    children: React.ReactNode;
    type: TextType;
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
}: AtLeast<Props, 'children'>) => (
    <Text
        style={StyleSheet.flatten([styles[`${type}`], { color }, style])}
        numberOfLines={numberOfLines}
        onPress={onPress}
        testID={testID}>
        {children}
    </Text>
);

export default LAText;
