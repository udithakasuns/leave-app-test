/* eslint-disable @typescript-eslint/no-use-before-define */
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { EmployeeViewAllScreensProps } from 'navigators/types';
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Spacer, Text } from 'src/components/atoms';
import { BackHeader } from 'src/components/molecules';
import { LALeaveRequestList } from 'src/components/organisms';
import { useEmployeeFilterStore, useEmployeeStore } from 'src/store';
import useBackAction from 'src/utils/hooks/useBackAction';
import { useAllLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import theme from 'src/utils/theme';
import { LeaveRequestType, Page } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const { scale, deviceDimensions } = theme;

const EmployeeHomeViewAll: React.FC<EmployeeViewAllScreensProps> = () => {
    const { params, resetFiltersParams } = useEmployeeFilterStore();

    const { getEmployeeModal } = useEmployeeStore();
    const backAction = useBackAction();

    const {
        data: leaveRequests,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
    }: UseInfiniteQueryResult<
        Page<LeaveRequestType[]>
    > = useAllLeaveRequestData(params);

    const handleRequestItemPress = (item: LeaveRequestType) => {
        getEmployeeModal(item.leaveRequestId);
    };

    const onGoBack = () => {
        resetFiltersParams();
        backAction();
        return true;
    };

    const callNextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };
    return (
        <View style={screenStyles.container}>
            <BackHeader title='Home' onBackPress={onGoBack} />
            <>
                <Spacer />
                <Text type='SubHBold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!isInitialLoading && leaveRequests?.pages ? (
                    <LALeaveRequestList
                        leaveRequests={leaveRequests.pages
                            .map(page => page.items)
                            .flat()}
                        callNextPage={callNextPage}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                    />
                ) : (
                    <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item
                            flexDirection='row'
                            alignItems='center'
                            height={(4 * deviceDimensions.height) / 5}
                            width='100%'
                            marginVertical={scale.sc16}
                        />
                    </SkeletonPlaceholder>
                )}
            </>
        </View>
    );
};

export default EmployeeHomeViewAll;
