import React from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    month: string;
}

const LAMonthSection = ({ month, testId, testIdContent }: Props) => (
    <View style={styles.container}>
        <Text
            testID={testIdContent}
            type='ParaSM'
            style={styles.contentContainer}
            color={colors.primaryGrayLabel}>
            {month}
        </Text>
        <Divider testId={testId} />
    </View>
);

export default LAMonthSection;
