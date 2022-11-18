import React from 'react';
import { Pressable, View } from 'react-native';
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
    onPress: () => void;
}

const LARequestListItem = ({
    date,
    status,
    entitlement,
    testIdContent,
    testIdChip,
    testId,
    onPress,
}: Props) => (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.dateContainer}>
            <Text testID={testIdContent} type='ParaSM'>
                {date}
            </Text>
        </View>
        <Chip
            testIdContent={testIdChip}
            content={entitlement}
            contentColor={colors.gray600}
            contentTextType='ParaLG'
            contentStyle={styles.contentStyle}
            containerStyle={styles.containerStyle}
        />
        <StatusChip testId={testId} status={status} onPress={onPress} />
    </Pressable>
);

export default LARequestListItem;
