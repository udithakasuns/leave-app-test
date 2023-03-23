import React from 'react';
import { Pressable, View } from 'react-native';
import { Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { EmployeeType, StatusType, TestProps } from 'src/utils/types';
import { AvatarChip, StatusChip } from 'components/molecules';
import { styles } from './styles';

const { colors, pixel, scale } = theme;

interface Props extends Partial<TestProps> {
    testIdRow: string;
    date: string;
    // entitlement: string;
    employee: EmployeeType;
    onPress: () => void;
    // entitlementChipColor: string;
    testIdStatus: string;
    status: StatusType | '';
    chipsColor: string;
}

const LAPendingListItem = ({
    testIdRow,
    date,
    employee,
    testId,
    testIdContent,
    onPress,
    testIdStatus,
    status,
    chipsColor,
}: Props) => (
    <Pressable onPress={onPress} style={styles.container}>
        <AvatarChip
            testIdContent={testIdRow}
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
        <StatusChip
            testId={testId}
            testIdContent={testIdStatus}
            status={status}
            containerStyle={{ backgroundColor: chipsColor }}
            onPress={onPress}
        />
        <View style={styles.dateContainer}>
            <Text testID={testIdContent} type='ParaSM'>
                {date}
            </Text>
        </View>
    </Pressable>
);

export default LAPendingListItem;
