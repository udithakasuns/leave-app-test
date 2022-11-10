/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { ScrollView, SectionList, View } from 'react-native';
import { Chip, Divider, Spacer } from 'src/components/atoms';
import {
    MonthSection,
    MultiButtonProps,
    MultiChipProps,
    RequestListItem,
} from 'src/components/molecules';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getLeaveUnicode } from 'src/utils/helpers/unicodeHandler';
import theme from 'src/utils/theme';
import {
    Entitlement,
    LeaveRequestType,
    Section,
    TestProps,
} from 'src/utils/types';
import { LAFilters } from '../..';
import { styles } from './styles';

const { colors } = theme;

const leaveStatusChips: MultiChipProps[] = [
    {
        chipId: 1,
        content: 'Pending',
    },
    {
        chipId: 2,
        content: 'Approved',
    },
    {
        chipId: 3,
        content: 'Denied',
    },
];

const leaveTypeChips: MultiChipProps[] = [
    {
        chipId: 1,
        content: 'Causal',
    },
    {
        chipId: 2,
        content: 'Annual',
    },
    {
        chipId: 3,
        content: 'Sick',
    },
];

const sortByButtons: MultiButtonProps[] = [
    {
        buttonId: 1,
        label: 'Date Requested',
        selected: true,
    },
    {
        buttonId: 2,
        label: 'LeaveDate',
    },
];

export type EntitlementSelection = Entitlement & {
    isSelected?: boolean;
};

interface Props extends Partial<TestProps> {
    leaveRequests: Section[];
}

const LALeaveRequestList = ({ leaveRequests }: Props) => {
    const Item = ({ item }: { item: LeaveRequestType }) => (
        <RequestListItem
            date={getStartEndDate(item.startDate, item.endDate)}
            status={item.status}
            entitlement={`${getLeaveUnicode(item.leaveType)}  ${
                item.leaveType.name
            }`}
        />
    );

    return (
        <View style={styles.container}>
            <LAFilters
                leaveStatusChips={leaveStatusChips}
                leaveTypeChips={leaveTypeChips}
                sortByButtons={sortByButtons}
            />
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContainer}>
                <SectionList<LeaveRequestType, Section>
                    sections={leaveRequests}
                    keyExtractor={(item, index) => item.status + index}
                    scrollEnabled={false}
                    renderItem={({ item }) => <Item item={item} />}
                    ListFooterComponent={
                        <View style={styles.footerContainer}>
                            <Spacer height={6} />
                            <Divider />
                            <Spacer height={6} />
                            <Chip
                                content='View All'
                                rightIconName='arrow-forward'
                                outline
                                contentColor={colors.black}
                                onPressChip={() => {}}
                                contentTextType='ParaLG'
                                outlineColor={colors.gray300}
                                contentStyle={styles.viewAllContent}
                                pressableContainerStyle={styles.viewAllPress}
                                containerStyle={styles.viewAllContainer}
                            />
                        </View>
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <MonthSection month={title} />
                    )}
                />
            </ScrollView>
        </View>
    );
};

export default LALeaveRequestList;
