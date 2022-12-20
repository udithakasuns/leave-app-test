import { useIsFocused } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ManagerHomeScreensProps } from 'navigators/types';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { MultiChipProps } from 'src/components/molecules';
import { LAAppBar } from 'src/components/organisms';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import {
    useManagerFilterStore,
    useManagerStore,
    useUserStore,
} from 'src/store';
import { getGreetingsByTime } from 'src/utils/helpers/dateHandler';
import {
    filterChipsManager,
    sortByButtonsManager,
} from 'src/utils/helpers/defaultData';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { usePendingRequestData } from 'src/utils/hooks/usePendingRequestData';

import { FilterTypes, PendingRequestType, Page } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const ManagerHome: React.FC<ManagerHomeScreensProps> = () => {
    const {
        user: { firstName },
    } = useUserStore();
    const isFocused = useIsFocused();

    const { getManagerModal } = useManagerStore();
    const {
        params,
        filterChips,
        setSortByButtons,
        setFilterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useManagerFilterStore();

    const {
        data: leaveRequests,
        refetch: refetchLeaveRequests,
    }: UseQueryResult<Page<PendingRequestType[]>> = usePendingRequestData(
        { ...params, size: 5 },
        (data: Page<PendingRequestType[]>) => {
            if (
                data === undefined ||
                data?.items === undefined ||
                data?.items?.length === 0 ||
                data === undefined
            ) {
                setEmptyFilterUtils();
            } else {
                resetFilterUtils();
            }
        },
    );

    const {
        refetch: statusTypesRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData(
        false,
        (data: FilterTypes[]) => {
            const chipProps: MultiChipProps[] = data.map(
                (item): MultiChipProps => ({
                    chipId: item.typeId,
                    content: item.name,
                }),
            );
            const tempFilterChips = filterChips.filter(item => item.id !== 2);
            if (chipProps.length > 0)
                setFilterChips([
                    ...tempFilterChips,
                    {
                        id: 2,
                        title: 'Leave Type',
                        chips: chipProps,
                    },
                ]);
        },
    );

    const handleRequestItemPress = (item: PendingRequestType) => {
        getManagerModal(item.leaveRequestId);
    };

    useEffect(() => {
        if (isFocused) {
            setSortByButtons(sortByButtonsManager);
            setFilterChips(filterChipsManager);
            refetchLeaveRequests();
            statusTypesRefetch();
        }
    }, [isFocused]);

    return (
        <View style={screenStyles.containerScollable}>
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <LAAppBar currentScreen='manager' />
                <Spacer />
                <Text type='H1Bold'>
                    Hey {firstName} {'\n'}
                    {getGreetingsByTime()}
                </Text>
                <Spacer />
                <Text type='SubHBold'>Leave requests</Text>
                <LAPendingRequestList
                    leaveRequests={leaveRequests?.items}
                    onPressRequestItem={handleRequestItemPress}
                    isViewAllPage={false}
                    totalItems={leaveRequests?.totalItems ?? 0}
                />
            </ScrollView>
        </View>
    );
};

export default ManagerHome;
