import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { AtLeast, TestProps } from '../../../utils/types';
import { styles } from './styles';

type TextType =
    | 'H1'
    | 'H2'
    | 'H3'
    | 'H4'
    | 'H5'
    | 'H6'
    | 'body1'
    | 'body2'
    | 'body3';

interface Props extends TextProps, TestProps {
    children: React.ReactNode;
    type: TextType;
    testID: string;
}

const LAText = ({
    style,
    children,
    numberOfLines,
    onPress,
    testID,
    type = 'H6',
}: AtLeast<Props, 'children'>) => (
    <Text
        style={StyleSheet.flatten([styles.text, styles[`${type}Text`], style])}
        numberOfLines={numberOfLines}
        onPress={onPress}
        testID={testID}>
        {children}
    </Text>
);

export default LAText;
