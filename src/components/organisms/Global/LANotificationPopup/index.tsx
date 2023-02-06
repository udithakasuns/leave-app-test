import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import {
    useEmployeeStore,
    useManagerStore,
    useNotificationStore,
} from 'src/store';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Button, Loader, SwipeRefresh } from 'src/components/atoms';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getHttpNotifications } from 'src/services/http';
import { NotificationPayload, NotificationVisibleType } from 'utils/types';
import { AxiosError } from 'axios';
import { NotificationContent } from 'src/components/molecules';
import { patchHttpViewNotification } from 'src/services/http/patchRequest';
import { NotificationFilterHeader } from 'components/organisms';
import {
    TID_NOTFIFICATION_LIST,
    TID_NOTFIFICATION_ROW,
} from 'src/utils/testIds';
import { styles } from './styles';
import LAEmptyError from '../LAEmptyError';

const LANotificationPopup = () => {
    const navigation: any = useNavigation();
    const {
        isPopupVisible,
        setIsPopupVisible,
        notifyUserRole,
        getCount,
        count,
    } = useNotificationStore();
    const [visibleType, setVisibleType] =
        useState<NotificationVisibleType>('all');

    const { getManagerModal } = useManagerStore();
    const { getEmployeeModal } = useEmployeeStore();

    const {
        isLoading,
        data,
        refetch: onRefetchNotifications,
        isRefetching: isRefetchingNotifications,
    }: UseQueryResult<NotificationPayload, AxiosError> = useQuery(
        ['notifications'],
        () => {
            if (isPopupVisible) {
                return getHttpNotifications(0, 5, notifyUserRole, visibleType);
            }
            return null;
        },
        {
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: false,
        },
    );

    const onClosePopup = () => setIsPopupVisible(false);

    const onPressViewAll = () => {
        onClosePopup();
        navigation.navigate('NotificationViewAll');
    };

    const onPressNotification = async (
        notificationId: string,
        resourceId: number,
    ) => {
        await patchHttpViewNotification(notificationId);
        getCount(notifyUserRole);
        onClosePopup();

        if (notifyUserRole === 'MANAGER') {
            getManagerModal(resourceId);
        } else if (notifyUserRole === 'EMPLOYEE') {
            getEmployeeModal(resourceId);
        }
    };

    useEffect(() => {
        if (isPopupVisible) {
            onRefetchNotifications();
        }
    }, [isPopupVisible, notifyUserRole, visibleType, count]);

    return (
        <Modal
            onBackButtonPress={onClosePopup}
            useNativeDriver
            style={styles.modal}
            isVisible={isPopupVisible}
            animationOutTiming={1}
            animationInTiming={300}
            animationIn='fadeIn'>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <NotificationFilterHeader
                        visibleType={visibleType}
                        onChangeVisibleType={type => setVisibleType(type)}
                        onClose={onClosePopup}
                    />
                    <View style={styles.content}>
                        <FlatList
                            testID={TID_NOTFIFICATION_LIST}
                            showsVerticalScrollIndicator={false}
                            data={data?.items}
                            keyExtractor={item => item.id.toString()}
                            refreshControl={
                                <SwipeRefresh
                                    onRefresh={onRefetchNotifications}
                                    refreshing={isRefetchingNotifications}
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
                            ListHeaderComponent={
                                isLoading ? <Loader isVisible /> : <View />
                            }
                            ListEmptyComponent={
                                !isLoading ? (
                                    <LAEmptyError
                                        title='No notifications'
                                        subTitle='No new notifications available at the moment. When you get new notifications, they will show up here'
                                    />
                                ) : null
                            }
                        />
                        <Button
                            mode='contained-gray'
                            label='View all notifications'
                            onPress={onPressViewAll}
                            icon='arrow-forward'
                            iconPosition='left'
                        />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default LANotificationPopup;
