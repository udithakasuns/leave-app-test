/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { ScrollView, SectionList, View } from 'react-native';
import { Chip, Divider, Spacer, Text } from 'src/components/atoms';
import { MonthSection, RequestListItem } from 'src/components/molecules';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import theme from 'src/utils/theme';
import { LeaveRequestType, Section, TestProps } from 'src/utils/types';
import { LAFilters } from '../..';
import { FilterProps } from '../../Global/LAFilters';
import { styles } from './styles';

const { colors, scale, fontSize } = theme;

interface Props extends Partial<TestProps>, FilterProps {
    leaveRequests: Section[];
    onPressRequestItem: (item: LeaveRequestType) => void;
}

const LALeaveRequestList = ({
    leaveRequests,
    sortByButtons,
    onSortPress,
    onFilterPress,
    filterChips,
    onPressRequestItem,
}: Props) => {
    const Item = ({ item }: { item: LeaveRequestType }) => (
        <RequestListItem
            date={getStartEndDate(item.startDate, item.endDate)}
            status={item.status}
            entitlement={getEntitlementChipText(
                item.leaveType,
                item.leaveType.name,
            )}
            onPress={() => onPressRequestItem(item)}
        />
    );

    return (
        <View style={styles.container}>
            <LAFilters
                filterChips={filterChips}
                sortByButtons={sortByButtons}
                onSortPress={onSortPress}
                onFilterPress={onFilterPress}
            />
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContainer}>
                <SectionList<LeaveRequestType, Section>
                    sections={leaveRequests}
                    ListEmptyComponent={
                        <View
                            style={{
                                paddingVertical: scale.vsc80,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontSize: fontSize.fs24 }}>🧐</Text>
                            <Spacer height={2} />
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text type='SubHBold'>No leave requests</Text>
                                <Spacer height={2} />
                                <Text
                                    type='ParaSM'
                                    style={{
                                        color: colors.primaryGrayLabel,
                                        textAlign: 'center',
                                        paddingHorizontal: scale.sc32,
                                    }}>
                                    You have not requested leave. When you make
                                    a leave request, that will show up here.
                                    Don’t fret!
                                </Text>
                            </View>
                        </View>
                    }
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
