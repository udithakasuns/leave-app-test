/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View } from 'react-native';
import { Chip, Spacer, Text } from 'src/components/atoms';
import { TestProps } from 'src/utils/types';
import { styles } from './styles';

type LeaveInfo = {
    infoId: number;
    label: string;
    element: string;
};

interface Props extends Partial<TestProps> {
    leaveInfo: LeaveInfo[];
}

const ItemRow = ({ title, date }: { title: string; date: string }) => (
    <View style={styles.itemRow}>
        <Text type='ParaLG' style={[styles.itemText]}>
            {title}
        </Text>
        <>
            <Spacer />
            <View style={styles.durationContainer}>
                <Chip
                    content={date}
                    contentTextType='ParaLG'
                    containerStyle={styles.durationChip}
                />
            </View>
        </>
    </View>
);

const LALeaveInformationSection = ({ leaveInfo }: Props) => (
    <>
        {leaveInfo.map(item => (
            <ItemRow key={item.infoId} title={item.label} date={item.element} />
        ))}
    </>
);

export default LALeaveInformationSection;
