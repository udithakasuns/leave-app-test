import React from 'react';
import { View } from 'react-native';
import { TestProps } from 'src/utils/types';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    height: number;
    width: number;
}

const LASpacer = ({ height = 10, width = 10, testId }: Partial<Props>) => {
    const { container } = styles(height, width);
    return <View testID={testId} style={container} />;
};

export default LASpacer;
