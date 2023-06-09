/* eslint-disable react/no-unstable-nested-components */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import {
    Button,
    Chip,
    Divider,
    Spacer,
    SwipeRefresh,
    Text,
} from 'src/components/atoms';
import { RequestListItem } from 'src/components/molecules';
import { DrawerScreenNavigationProp } from 'src/navigators/types';
import { useEmployeeFilterStore, useRecipientStore } from 'src/store';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getErrorMessage } from 'src/utils/helpers/errorCodes';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import {
    TID_EMPLOYEE_LEAVE_REQUEST_DATE,
    TID_EMPLOYEE_LEAVE_REQUEST_LIST,
    TID_EMPLOYEE_LEAVE_REQUEST_ROW,
    TID_EMPLOYEE_LEAVE_REQUEST_STATUS,
    TID_EMPLOYEE_LEAVE_REQUEST_TYPE,
} from 'src/utils/testIds';
import theme from 'src/utils/theme';
import {
    AtLeast,
    FilterProps,
    LeaveRequestType,
    TestProps,
} from 'src/utils/types';
import LAEmployeeFilters from '../LAEmployeeFilters';
import styles from './styles';

const { colors, scale, fontSize } = theme;

interface Props extends Partial<TestProps>, FilterProps {
    leaveRequests: LeaveRequestType[];
    onPressRequestItem: (item: LeaveRequestType) => void;
    callNextPage?: () => void;
    isViewAllPage: boolean;
    totalItems: number;
    latestLeaveRequestID?: number;
    isRefetchLeaveRequests: boolean;
    onRefetchLeaveRequests: () => void;
}

const LALeaveRequestList = ({
    leaveRequests,
    onPressRequestItem,
    isViewAllPage = false,
    callNextPage,
    totalItems,
    latestLeaveRequestID,
    isRefetchLeaveRequests,
    onRefetchLeaveRequests,
}: AtLeast<Props, 'isViewAllPage' | 'onPressRequestItem'>) => {
    const { filterUtils, resetFiltersParams } = useEmployeeFilterStore();
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const { managers } = useRecipientStore();
    const {
        container,
        footerContainer,
        viewAllContainer,
        viewAllContent,
        viewAllPress,
    } = styles(isViewAllPage);

    // const Item = ({
    //     item,
    //     index,
    // }: {
    //     item: LeaveRequestType;
    //     index: number;
    // }) => (
    //     <RequestListItem
    //         testIdRow={`${TID_EMPLOYEE_LEAVE_REQUEST_ROW}_${index.toString()}`}
    //         testId={`${TID_EMPLOYEE_LEAVE_REQUEST_STATUS}_${index.toString()}`}
    //         date={getStartEndDate(item.startDate, item.endDate)}
    //         status={item.status}
    //         entitlement={getEntitlementChipText(
    //             item.leaveType,
    //             item.leaveType.name,
    //         )}
    //         isAnimated={latestLeaveRequestID === item.leaveRequestId}
    //         onPress={() => onPressRequestItem(item)}
    //         chipsColor={isViewAllPage ? colors.tertiaryColor : colors.white}
    //     />
    // );

    return (
        <View style={container}>
            {managers.length > 0 && <LAEmployeeFilters />}
            <FlatList
                testID={TID_EMPLOYEE_LEAVE_REQUEST_LIST}
                data={leaveRequests && managers.length > 0 ? leaveRequests : []}
                refreshControl={
                    onRefetchLeaveRequests ? (
                        <SwipeRefresh
                            refreshing={isRefetchLeaveRequests || false}
                            onRefresh={onRefetchLeaveRequests}
                        />
                    ) : undefined
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
                keyExtractor={item => item.leaveRequestId.toLocaleString()}
                renderItem={({ item, index }) => (
                    <RequestListItem
                        testId={`${TID_EMPLOYEE_LEAVE_REQUEST_ROW}`}
                        testIdRow={`${TID_EMPLOYEE_LEAVE_REQUEST_ROW}_${index.toString()}`}
                        testIdContent={`${TID_EMPLOYEE_LEAVE_REQUEST_DATE}_${index.toString()}`}
                        testIdChip={`${TID_EMPLOYEE_LEAVE_REQUEST_TYPE}_${index.toString()}`}
                        testIdStatus={`${TID_EMPLOYEE_LEAVE_REQUEST_STATUS}_${index.toString()}`}
                        date={getStartEndDate(item.startDate, item.endDate)}
                        status={item.status}
                        entitlement={getEntitlementChipText(
                            item.leaveType,
                            item.leaveType.name,
                        )}
                        isAnimated={
                            latestLeaveRequestID === item.leaveRequestId
                        }
                        onPress={() => onPressRequestItem(item)}
                        chipsColor={
                            isViewAllPage ? colors.tertiaryColor : colors.white
                        }
                    />
                    // <Item item={item} index={index} />
                )}
                onEndReachedThreshold={0.3}
                onEndReached={() => {
                    if (callNextPage) {
                        callNextPage();
                    }
                }}
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
                                    !(
                                        managers.length > 0 &&
                                        totalItems &&
                                        totalItems > 5
                                    )
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
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default LALeaveRequestList;
