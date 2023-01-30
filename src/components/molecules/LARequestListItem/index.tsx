import React from 'react';
import { Pressable, View } from 'react-native';
import { Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { StatusType, TestProps } from 'src/utils/types';
import { StatusChip } from '..';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    testIdRow: string;
    date: string;
    entitlement: string;
    status: StatusType | '';
    onPress: () => void;
    chipsColor: string;
    isAnimated: boolean;
}

const LARequestListItem = ({
    testIdRow,
    date,
    status,
    entitlement,
    testIdContent,
    testIdChip,
    testId,
    onPress,
    chipsColor,
    isAnimated,
}: Props) => (
    <Pressable
        testID={testIdRow}
        onPress={onPress}
        style={isAnimated ? styles.annimationContainer : styles.container}>
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
            backgroundColor={chipsColor}
        />
        <StatusChip
            testId={testId}
            status={status}
            containerStyle={{ backgroundColor: chipsColor }}
            onPress={onPress}
        />
    </Pressable>
);

export default LARequestListItem;
