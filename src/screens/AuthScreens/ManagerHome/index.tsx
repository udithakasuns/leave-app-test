import { useIsFocused } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ManagerHomeScreensProps } from 'navigators/types';
import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Spacer, SwipeRefresh, Text } from 'src/components/atoms';
import { MultiChipProps } from 'src/components/molecules';
import { LAAppBar, TeamAvailability } from 'src/components/organisms';
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
import { useQueryManagerTeams } from 'src/utils/query/TeamAvailablity';

import { FilterTypes, PendingRequestType, Page } from 'src/utils/types';
import { screenStyles } from 'utils/styles';
import theme from '../../../utils/theme';

const { deviceDimensions } = theme;
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
        isRefetching: isRefetchLeaveRequests,
        isLoading,
    }: UseQueryResult<Page<PendingRequestType[]>> = usePendingRequestData(
        params,
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

    const {
        isInitialLoadingManagerTeams,
        managerTeams,
        onRefetchManagerTeams,
        isRefetchingManagerTeams,
        isManagerTeamError,
    } = useQueryManagerTeams({ enableQuery: true });

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
                refreshControl={
                    <SwipeRefresh
                        refreshing={
                            isRefetchLeaveRequests ||
                            isInitialLoadingManagerTeams
                        }
                        onRefresh={() => {
                            refetchLeaveRequests();
                            onRefetchManagerTeams();
                        }}
                    />
                }
                contentContainerStyle={screenStyles.scrollViewContainer}
                showsVerticalScrollIndicator={false}>
                <LAAppBar currentScreen='manager' />
                <Spacer />
                <Text testID='txtGreetingHome' numberOfLines={1} type='H1Bold'>
                    Hey {firstName}
                </Text>
                <Text type='H1Bold'>{getGreetingsByTime()}</Text>
                <Spacer />
                <TeamAvailability
                    managerTeams={managerTeams || []}
                    isManagerTeamsInitialLoading={isInitialLoadingManagerTeams}
                    isManagerTeamsRefetching={isRefetchingManagerTeams}
                    isManagerTeamsNotFound={isManagerTeamError}
                />
                <Spacer />
                <Text type='SubHBold'>Leave requests</Text>
                {isLoading ? (
                    [...Array(6)].map(item => (
                        <SkeletonPlaceholder key={item} borderRadius={4}>
                            <SkeletonPlaceholder.Item
                                key={item * 2}
                                flexDirection='row'
                                alignItems='center'
                                height={deviceDimensions.height / 16}
                                width='100%'
                                marginBottom={20}
                            />
                        </SkeletonPlaceholder>
                    ))
                ) : (
                    <LAPendingRequestList
                        leaveRequests={leaveRequests?.items}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage={false}
                        totalItems={leaveRequests?.totalItems ?? 0}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default ManagerHome;
