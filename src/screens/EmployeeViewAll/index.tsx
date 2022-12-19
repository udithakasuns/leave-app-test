/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import {
    DrawerScreenNavigationProp,
    EmployeeViewAllScreensProps,
} from 'navigators/types';
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { LALeaveRequestList } from 'src/components/organisms';
import { useEmployeeFilterStore, useEmployeeStore } from 'src/store';
import { useAllLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import theme from 'src/utils/theme';
import { LeaveRequestType, Page } from 'src/utils/types';

import { styles } from './styles';

const { scale, pixel, deviceDimensions } = theme;

const EmployeeHomeViewAll: React.FC<EmployeeViewAllScreensProps> = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const { params, resetFiltersParams } = useEmployeeFilterStore();

    const { getEmployeeModal } = useEmployeeStore();

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

    const backAction = () => {
        resetFiltersParams();
        navigation.jumpTo('EmployeeHome');
        return true;
    };

    const callNextPage = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };
    return (
        <View style={styles.innerContainer}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: pixel(8),
                }}>
                <Icon
                    name='arrow-back'
                    enableBackground
                    size={IconSize.medium}
                    increasePadding={1}
                    onPress={backAction}
                />
                <Spacer />
                <Text>Home</Text>
            </View>
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
