import {
    useInfiniteQuery,
    UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Loader, Spacer, SwipeRefresh } from 'src/components/atoms';
import { BackHeader, NotificationContent } from 'src/components/molecules';
import { NotificationFilterHeader } from 'src/components/organisms';
import LAEmptyError from 'src/components/organisms/Global/LAEmptyError';
import { NotificationViewAllScreensProps } from 'src/navigators/types';
import { getHttpNotifications } from 'src/services/http';
import { patchHttpViewNotification } from 'src/services/http/patchRequest';
import {
    useEmployeeStore,
    useManagerStore,
    useNotificationStore,
} from 'src/store';
import useBackAction from 'src/utils/hooks/useBackAction';
import {
    TID_NOTFIFICATION_LIST,
    TID_NOTFIFICATION_ROW,
} from 'src/utils/testIds';
import { NotificationPayload, NotificationVisibleType } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const NotificationViewAll: React.FC<NotificationViewAllScreensProps> = () => {
    const [visibleType, setVisibleType] =
        useState<NotificationVisibleType>('all');

    const { getEmployeeModal } = useEmployeeStore();
    const { getManagerModal } = useManagerStore();
    const { notifyUserRole, getCount } = useNotificationStore();

    const backAction = useBackAction();

    const {
        isLoading,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
        isRefetching,
    }: UseInfiniteQueryResult<NotificationPayload, AxiosError> =
        useInfiniteQuery({
            queryKey: ['allNotifications', visibleType, notifyUserRole],
            queryFn: ({ pageParam = 0 }) =>
                getHttpNotifications(
                    pageParam,
                    10,
                    notifyUserRole,
                    visibleType,
                ),

            getNextPageParam: lastPageData => {
                if (lastPageData.totalPages - 1 > lastPageData.currentPage) {
                    return lastPageData.currentPage + 1;
                }
                return null;
            },
        });

    const onPressNotification = async (
        notificationId: string,
        resourceId: number,
    ) => {
        // Need to update this functionalities
        await patchHttpViewNotification(notificationId);
        refetch();
        getCount(notifyUserRole);
        if (notifyUserRole === 'MANAGER') {
            getManagerModal(resourceId);
        } else if (notifyUserRole === 'EMPLOYEE') {
            getEmployeeModal(resourceId);
        }
    };

    const onHandlePagination = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    return (
        <View style={screenStyles.container}>
            <BackHeader title='Home' onBackPress={backAction} />
            <Spacer />
            <NotificationFilterHeader
                visibleType={visibleType}
                onChangeVisibleType={type => setVisibleType(type)}
            />
            <FlatList
                testID={TID_NOTFIFICATION_LIST}
                showsVerticalScrollIndicator={false}
                data={data?.pages.map(page => page.items).flat()}
                keyExtractor={(_, index) => index.toString()}
                onEndReached={onHandlePagination}
                initialNumToRender={10}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <SwipeRefresh
                        onRefresh={refetch}
                        refreshing={isRefetching}
                    />
                }
                renderItem={({ item, index }) => (
                    <NotificationContent
                        testIdRow={`${TID_NOTFIFICATION_ROW}_${index.toString()}`}
                        type={item.notificationType}
                        body={item.body}
                        date={item.createdDate}
                        isViewed={item.viewed}
                        onPress={() =>
                            onPressNotification(
                                item.id.toString(),
                                item.resourceId,
                            )
                        }
                    />
                )}
                ListHeaderComponent={<Loader isVisible={isLoading} />}
                ListEmptyComponent={
                    !isLoading ? (
                        <LAEmptyError
                            title='No notifications'
                            subTitle='No new notifications available at the moment. When you get new notifications, they will show up here'
                        />
                    ) : null
                }
                ListFooterComponent={<Loader isVisible={isFetchingNextPage} />}
            />
        </View>
    );
};

export default NotificationViewAll;
