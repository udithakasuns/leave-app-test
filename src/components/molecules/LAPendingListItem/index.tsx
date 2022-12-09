import React from 'react';
import { Pressable, View } from 'react-native';
import { Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { EmployeeType, TestProps } from 'src/utils/types';
import { AvatarChip } from '..';
import { styles } from './styles';

const { colors, pixel, scale } = theme;

interface Props extends Partial<TestProps> {
    date: string;
    entitlement: string;
    employee: EmployeeType;
    onPress: () => void;
    entitlementChipColor: string;
}

const LAPendingListItem = ({
    date,
    employee,
    entitlement,
    testIdContent,
    testIdChip,
    onPress,
    entitlementChipColor,
}: Props) => (
    <Pressable onPress={onPress} style={styles.container}>
        <AvatarChip
            label={employee.name?.split(' ')[0] ?? ''}
            source={{
                uri: employee.authPic ?? '',
            }}
            containerStyle={{
                paddingVertical: scale.sc1,
                backgroundColor: colors.white,
                maxWidth: pixel(140),
                minWidth: pixel(140),
            }}
            labelStyle={{
                flex: 1,
            }}
        />
        <Chip
            testIdContent={testIdChip}
            content={entitlement}
            contentColor={colors.gray600}
            contentTextType='ParaLG'
            contentStyle={styles.contentStyle}
            backgroundColor={entitlementChipColor}
            containerStyle={styles.containerStyle}
        />
        <View style={styles.dateContainer}>
            <Text testID={testIdContent} type='ParaSM'>
                {date}
            </Text>
        </View>
    </Pressable>
);

export default LAPendingListItem;
