import React from 'react';
import { View } from 'react-native';
import { Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { StatusType, TestProps } from 'src/utils/types';
import { StatusChip } from '..';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    date: string;
    entitlement: string;
    status: StatusType;
}

const LARequestListItem = ({
    date,
    status,
    entitlement,
    testIdContent,
    testIdChip,
    testId,
}: Props) => (
    <View style={styles.container}>
        <View style={styles.dateContainer}>
            <Text testID={testIdContent} type='ParaSM'>
                {date}
            </Text>
        </View>
        <Chip
            testIdContent={testIdChip}
            content={entitlement}
            contentColor={colors.gray600}
            onPressChip={() => {}}
            contentTextType='ParaLG'
            contentStyle={styles.contentStyle}
            pressableContainerStyle={styles.pressableContainerStyle}
            containerStyle={styles.containerStyle}
        />
        <StatusChip testId={testId} status={status} onPress={() => {}} />
    </View>
);

export default LARequestListItem;
