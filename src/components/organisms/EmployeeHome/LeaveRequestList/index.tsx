/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Alert, ScrollView, SectionList, StyleSheet, View } from 'react-native';
import { Button, Chip, Icon, IconSize, Text } from 'src/components/atoms';
import { Modal, RequestListItem } from 'src/components/molecules';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getLeaveUnicode } from 'src/utils/helpers/unicodeHandler';
import theme from 'src/utils/theme';
import {
    Entitlement,
    LeaveRequestType,
    Section,
    TestProps,
} from 'src/utils/types';

const { colors, scale, radius } = theme;

export type EntitlementSelection = Entitlement & {
    isSelected?: boolean;
};

interface Props extends Partial<TestProps> {
    leaveRequests: Section[];
}

const LeaveRequestList = ({ leaveRequests }: Props) => {
    const [isSortModalVisible, setIsSortModalVisible] =
        useState<boolean>(false);
    const [isFilterModalVisible, setIsFilterModalVisible] =
        useState<boolean>(false);
    const Item = ({ item }: { item: LeaveRequestType }) => (
        <RequestListItem
            date={getStartEndDate(item.startDate, item.endDate)}
            status={item.status}
            entitlement={`${getLeaveUnicode(item.leaveType)}  ${
                item.leaveType.name
            }`}
        />
    );
    const [sortBy, setSortBy] = useState<number>(1);

    return (
        <View
            style={{
                backgroundColor: colors.tertiaryColor,
                marginTop: scale.sc10,
                borderRadius: radius.rd8,
                paddingHorizontal: scale.sc16,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    paddingVertical: scale.vsc16,
                    justifyContent: 'space-between',
                }}>
                <Chip
                    content='Sort by : Date Requested'
                    rightIconName='arrow-drop-down'
                    outline
                    contentColor={colors.black}
                    onPressChip={() => setIsSortModalVisible(state => !state)}
                    contentTextType='ParaLG'
                    outlineColor={colors.gray300}
                    contentStyle={{
                        marginRight: scale.sc4,
                    }}
                    pressableContainerStyle={{
                        alignSelf: 'center',
                    }}
                    containerStyle={{
                        paddingVertical: scale.sc6,
                    }}
                />
                <Chip
                    content='Filter'
                    rightIconName='tune'
                    outline
                    contentColor={colors.black}
                    onPressChip={() => setIsFilterModalVisible(state => !state)}
                    contentTextType='ParaLG'
                    outlineColor={colors.gray300}
                    contentStyle={{
                        marginHorizontal: scale.sc4,
                    }}
                    pressableContainerStyle={{
                        alignSelf: 'center',
                    }}
                    containerStyle={{
                        paddingVertical: scale.sc6,
                    }}
                />
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{
                    width: '100%',
                    height: '100%',
                }}>
                <SectionList<LeaveRequestType, Section>
                    sections={leaveRequests}
                    keyExtractor={(item, index) => item.status + index}
                    renderItem={({ item }) => <Item item={item} />}
                    ListFooterComponent={
                        <View
                            style={{
                                justifyContent: 'flex-end',
                                paddingBottom: scale.vsc20,
                            }}>
                            <View style={{ height: scale.vsc10 }} />
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: colors.dividerColor,
                                }}
                            />
                            <View style={{ height: scale.sc12 }} />
                            <Chip
                                content='View All'
                                rightIconName='arrow-forward'
                                outline
                                contentColor={colors.black}
                                onPressChip={() => {
                                    Alert.alert('Hey');
                                }}
                                contentTextType='ParaLG'
                                outlineColor={colors.gray300}
                                contentStyle={{
                                    marginRight: scale.sc4,
                                }}
                                pressableContainerStyle={{
                                    alignSelf: 'flex-start',
                                }}
                                containerStyle={{
                                    paddingVertical: scale.sc6,
                                }}
                            />
                        </View>
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: scale.sc2,
                                paddingBottom: scale.sc10,
                            }}>
                            <Text
                                type='ParaSM'
                                style={{ marginRight: scale.sc10 }}
                                color={colors.primaryGrayLabel}>
                                {title}
                            </Text>
                            <View
                                style={{
                                    flex: 1,
                                    borderWidth: StyleSheet.hairlineWidth,
                                    borderColor: colors.dividerColor,
                                }}
                            />
                        </View>
                    )}
                />
            </ScrollView>
            <Modal
                onClose={() => setIsSortModalVisible(state => !state)}
                isVisible={isSortModalVisible}
                sheetBody={
                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: theme.scale.sc20,
                            marginBottom: theme.scale.vsc40,
                            marginTop: theme.scale.vsc26,
                        }}>
                        <Icon
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            name='close'
                            enableBackground
                            size={IconSize.medium}
                            increasePadding={2}
                            onPress={() =>
                                setIsSortModalVisible(state => !state)
                            }
                        />

                        <View style={{ height: scale.sc12 }} />
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            type='H1Bold'>
                            Sort by:
                        </Text>
                        <View style={{ height: scale.sc16 }} />
                        <Button
                            label='Date Requested'
                            mode={sortBy === 1 ? 'outlined' : 'contained-gray'}
                            icon={sortBy === 1 ? 'check-circle' : undefined}
                            alignContent='flex-start'
                            labelStyle={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                setSortBy(1);
                            }}
                        />
                        <View style={{ height: scale.sc12 }} />
                        <Button
                            label='Leave Date'
                            alignContent='flex-start'
                            mode={sortBy === 2 ? 'outlined' : 'contained-gray'}
                            icon={sortBy === 2 ? 'check-circle' : undefined}
                            labelStyle={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                setSortBy(2);
                            }}
                        />
                    </View>
                }
            />
            <Modal
                onClose={() => setIsFilterModalVisible(state => !state)}
                isVisible={isFilterModalVisible}
                sheetBody={
                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: theme.scale.vsc40,
                            marginTop: theme.scale.vsc26,
                        }}>
                        <Icon
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            name='close'
                            enableBackground
                            size={IconSize.medium}
                            increasePadding={2}
                            onPress={() =>
                                setIsFilterModalVisible(state => !state)
                            }
                        />
                        <View style={{ height: scale.sc12 }} />
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            type='H1Bold'>
                            Filter by:
                        </Text>
                        <View style={{ height: scale.sc20 }} />
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            type='ParaSMBold'>
                            Leave Status
                        </Text>
                        <View style={{ height: scale.sc12 }} />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
                            }}>
                            <Chip content='Pending' />
                            <View style={{ width: scale.sc4 }} />
                            <Chip content='Approved' />
                            <View style={{ width: scale.sc4 }} />
                            <Chip content='Denied' />
                        </View>
                        <View style={{ height: scale.sc12 }} />
                        <Text
                            style={{
                                alignSelf: 'flex-start',
                                marginLeft: scale.sc10,
                            }}
                            type='ParaSMBold'>
                            Leave Type
                        </Text>
                        <View style={{ height: scale.sc12 }} />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
                            }}>
                            <Chip content='Casual' />
                            <View style={{ width: scale.sc4 }} />
                            <Chip content='Annual' />
                            <View style={{ width: scale.sc4 }} />
                            <Chip content='Sick' />
                        </View>
                        <View style={{ height: scale.sc16 }} />
                        <Button
                            label='Apply'
                            mode='outlined'
                            labelStyle={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                setSortBy(1);
                            }}
                        />
                    </View>
                }
            />
        </View>
    );
};

export default LeaveRequestList;
