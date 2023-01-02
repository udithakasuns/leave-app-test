import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { ManagerViewAllScreensProps } from 'navigators/types';
import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Spacer, Text } from 'src/components/atoms';
import { BackHeader } from 'src/components/molecules';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import useBackAction from 'src/utils/hooks/useBackAction';
import { useAllPendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import theme from 'src/utils/theme';
import { Page, PendingRequestType } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const { scale, deviceDimensions } = theme;

const ManagerViewAll: React.FC<ManagerViewAllScreensProps> = () => {
    const { getManagerModal } = useManagerStore();
    const { params, resetFiltersParams } = useManagerFilterStore();

    const backAction = useBackAction();

    const {
        data: leaveRequests,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
    }: UseInfiniteQueryResult<
        Page<PendingRequestType[]>
    > = useAllPendingRequestData(params);

    const handleRequestItemPress = (item: PendingRequestType) => {
        getManagerModal(item.leaveRequestId);
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
                <Text type='H1Bold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!isInitialLoading && leaveRequests?.pages ? (
                    <LAPendingRequestList
                        leaveRequests={leaveRequests.pages
                            .map(page => page.items)
                            .flat()}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                        callNextPage={callNextPage}
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

export default ManagerViewAll;
