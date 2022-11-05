import React from 'react';
import { View } from 'react-native';
import { Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { StatusType, TestProps } from 'src/utils/types';
import { StatusChip } from '..';

const { scale, ms, colors } = theme;

interface Props extends Partial<TestProps> {
    date: string;
    entitlement: string;
    status: StatusType;
}

const LARequestListItem = ({ date, status, entitlement }: Props) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: scale.vsc12,
        }}>
        <View style={{ flexDirection: 'row', width: ms(75) }}>
            <Text type='ParaSM'>{date}</Text>
        </View>
        <Chip
            content={entitlement}
            contentColor={colors.gray600}
            onPressChip={() => {}}
            contentTextType='ParaLG'
            contentStyle={{
                marginHorizontal: scale.sc6,
            }}
            pressableContainerStyle={{
                alignSelf: 'center',
            }}
            containerStyle={{
                paddingVertical: scale.sc8,
                backgroundColor: colors.white,
            }}
        />
        <StatusChip status={status} onPress={() => {}} />
    </View>
);

export default LARequestListItem;
