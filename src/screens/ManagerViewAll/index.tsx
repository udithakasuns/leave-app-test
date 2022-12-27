import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { ManagerViewAllScreensProps } from 'navigators/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { BackHeader } from 'src/components/molecules';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import useBackAction from 'src/utils/hooks/useBackAction';
import { useAllPendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import theme from 'src/utils/theme';
import { Page, PendingRequestType } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const { scale } = theme;

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer />
                <Text type='H1Bold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!isInitialLoading && leaveRequests?.pages && (
                    <LAPendingRequestList
                        leaveRequests={leaveRequests.pages
                            .map(page => page.items)
                            .flat()}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                        callNextPage={callNextPage}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default ManagerViewAll;
