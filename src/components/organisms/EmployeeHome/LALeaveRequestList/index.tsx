/* eslint-disable react/no-unstable-nested-components */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, SectionList, View } from 'react-native';
import { Button, Chip, Divider, Spacer, Text } from 'src/components/atoms';
import { MonthSection, RequestListItem } from 'src/components/molecules';
import { DrawerScreenNavigationProp } from 'src/navigators/types';
import { useEmployeeFilterStore, useRecipientStore } from 'src/store';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getErrorMessage } from 'src/utils/helpers/errorCodes';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import theme from 'src/utils/theme';
import {
    AtLeast,
    FilterProps,
    LeaveRequestType,
    Section,
    TestProps,
} from 'src/utils/types';
import LAEmployeeFilters from '../LAEmployeeFilters';
import styles from './styles';

const { colors, scale, fontSize } = theme;

interface Props extends Partial<TestProps>, FilterProps {
    leaveRequests: Section<LeaveRequestType[]>[];
    onPressRequestItem: (item: LeaveRequestType) => void;
    callNextPage?: () => void;
    isViewAllPage: boolean;
}

const LALeaveRequestList = ({
    leaveRequests,
    onPressRequestItem,
    isViewAllPage = false,
}: AtLeast<Props, 'isViewAllPage' | 'onPressRequestItem'>) => {
    const { filterUtils, resetFiltersParams } = useEmployeeFilterStore();
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const { managers } = useRecipientStore();
    const {
        container,
        scrollViewContainer,
        footerContainer,
        viewAllContainer,
        viewAllContent,
        viewAllPress,
    } = styles(isViewAllPage);

    const Item = ({ item }: { item: LeaveRequestType }) => (
        <RequestListItem
            date={getStartEndDate(item.startDate, item.endDate)}
            status={item.status}
            entitlement={getEntitlementChipText(
                item.leaveType,
                item.leaveType.name,
            )}
            onPress={() => onPressRequestItem(item)}
            chipsColor={isViewAllPage ? colors.tertiaryColor : colors.white}
        />
    );

    return (
        <View style={container}>
            {managers.length > 0 && <LAEmployeeFilters />}
            <ScrollView horizontal contentContainerStyle={scrollViewContainer}>
                <SectionList<LeaveRequestType, Section<LeaveRequestType[]>>
                    sections={
                        leaveRequests && managers.length > 0
                            ? leaveRequests
                            : []
                    }
                    ListEmptyComponent={
                        <View
                            style={{
                                paddingVertical: scale.vsc64,
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
                                <Text type='SubHBold'>
                                    {
                                        getErrorMessage(
                                            // eslint-disable-next-line no-nested-ternary
                                            managers.length < 1
                                                ? 'NO_RECIPIENT'
                                                : filterUtils.isFiltersSelected
                                                ? 'EMPTY_FILTERS_REQUEST_LEAVE'
                                                : 'EMPTY_REQUEST_LEAVE',
                                        ).title
                                    }
                                </Text>
                                <Spacer height={2} />
                                <Text
                                    type='ParaSM'
                                    style={{
                                        color: colors.primaryGrayLabel,
                                        textAlign: 'center',
                                        paddingHorizontal: scale.sc32,
                                    }}>
                                    {
                                        getErrorMessage(
                                            // eslint-disable-next-line no-nested-ternary
                                            managers.length < 1
                                                ? 'NO_RECIPIENT'
                                                : filterUtils.isFiltersSelected
                                                ? 'EMPTY_FILTERS_REQUEST_LEAVE'
                                                : 'EMPTY_REQUEST_LEAVE',
                                        ).message
                                    }
                                </Text>
                                {filterUtils.isFiltersSelected && (
                                    <>
                                        <Spacer />
                                        <Button
                                            mode='outlined'
                                            label='Reset Filters'
                                            icon='restore'
                                            iconPosition='left'
                                            buttonStyle={{
                                                paddingVertical: scale.sc12,
                                            }}
                                            onPress={resetFiltersParams}
                                        />
                                    </>
                                )}
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => item.status + index}
                    scrollEnabled={false}
                    renderItem={({ item }) => <Item item={item} />}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={() =>
                        !isViewAllPage ? (
                            <View style={footerContainer}>
                                <Spacer height={6} />
                                <Divider />
                                <Spacer height={6} />
                                <Chip
                                    content='View All'
                                    rightIconName='arrow-forward'
                                    disabled={
                                        // eslint-disable-next-line no-nested-ternary
                                        managers.length < 1
                                            ? true
                                            : leaveRequests !== undefined
                                            ? !leaveRequests[0]
                                                  ?.isViewAllVisible
                                            : true ?? false
                                    }
                                    outline
                                    contentColor={colors.black}
                                    onPressChip={() =>
                                        navigation.navigate('EmployeeViewAll')
                                    }
                                    contentTextType='ParaLG'
                                    outlineColor={colors.gray300}
                                    contentStyle={viewAllContent}
                                    pressableContainerStyle={viewAllPress}
                                    containerStyle={viewAllContainer}
                                />
                            </View>
                        ) : null
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
