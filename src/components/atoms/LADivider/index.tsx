import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TestProps } from 'src/utils/types';
import styles from './styles';

interface Props extends Partial<TestProps> {
    borderWidth: number;
    style: StyleProp<ViewStyle>;
}

const LASpacer = ({
    borderWidth = StyleSheet.hairlineWidth,
    style,
    testId,
}: Partial<Props>) => {
    const { container } = styles(borderWidth);
    return <View testID={testId} style={[container, style]} />;
};

export default LASpacer;
