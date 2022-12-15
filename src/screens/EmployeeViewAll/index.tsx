/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import {
    DrawerScreenNavigationProp,
    EmployeeViewAllScreensProps,
} from 'navigators/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { LALeaveRequestList } from 'src/components/organisms';
import { useEmployeeFilterStore, useEmployeeStore } from 'src/store';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import theme from 'src/utils/theme';
import { LeaveRequestType, LeaveRequestWithPageType } from 'src/utils/types';
import { handleLeaveRequestSuccess } from '../../components/organisms/Global/LAGlobalEmployee/helpers/successHandlers';

import { styles } from './styles';

const { scale, pixel } = theme;

const EmployeeHomeViewAll: React.FC<EmployeeViewAllScreensProps> = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const {
        params,
        resetFiltersParams,
        setEmptyFilterUtils,
        resetFilterUtils,
        setParams,
    } = useEmployeeFilterStore();

    const { getEmployeeModal } = useEmployeeStore();

    const {
        data: leaveRequests,
        isLoading: loadingLeaveRequests,
    }: UseQueryResult<LeaveRequestWithPageType> = useLeaveRequestData(
        { ...params, size: 200 },
        false,
        (data: LeaveRequestWithPageType) =>
            handleLeaveRequestSuccess(
                data,
                setEmptyFilterUtils,
                resetFilterUtils,
            ),
    );

    const handleRequestItemPress = (item: LeaveRequestType) => {
        getEmployeeModal(item.leaveRequestId);
    };

    const backAction = () => {
        resetFiltersParams();
        navigation.jumpTo('EmployeeHome');
        return true;
    };

    const callNextPage = () => {
        if (
            params.page !== undefined &&
            leaveRequests &&
            params.page < leaveRequests.pageNumbers - 1
        ) {
            setParams({
                ...params,
                page: params.page || params.page === 0 ? params.page + 1 : 0,
            });
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer />
                <Text type='SubHBold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!loadingLeaveRequests && (
                    <LALeaveRequestList
                        leaveRequests={leaveRequests?.leaveRequestData}
                        callNextPage={callNextPage}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default EmployeeHomeViewAll;
