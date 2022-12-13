import React, { useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { useManagerStore, useNotificationStore } from 'src/store';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'src/components/atoms';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getHttpNotifications } from 'src/services/http';
import { NotificationPayload, NotificationVisibleType } from 'utils/types';
import { AxiosError } from 'axios';
import { NotificationContent } from 'src/components/molecules';
import { patchHttpViewNotification } from 'src/services/http/patchRequest';
import Header from './Header';
import { styles } from './styles';

const LANotificationPopup = () => {
    const navigation: any = useNavigation();
    const { isPopupVisible, setIsPopupVisible, notifyUserRole, getCount } =
        useNotificationStore();
    const [visibleType, setVisibleType] =
        useState<NotificationVisibleType>('all');

    const { getManagerModal } = useManagerStore();

    // 1st check the user is in Employee view or Manager View
    // Then check the visible Type

    const {
        data,
        error,
        refetch: onRefetch,
    }: UseQueryResult<NotificationPayload, AxiosError> = useQuery(
        [isPopupVisible, notifyUserRole, visibleType],
        () => {
            if (isPopupVisible) {
                return getHttpNotifications(0, 5, notifyUserRole, visibleType);
            }
            return null;
        },
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    );

    // console.log({ error });
    // console.log('totalItems: ', data?.totalItems);
    // console.log('data: ', data?.items);

    const onClosePopup = () => setIsPopupVisible(false);

    const onPressViewAll = () => {
        onClosePopup();
        navigation.navigate('Notifications');
    };

    // const { mutate: onPressNotification } = useMutation(
    //     ['nitificationView'],
    //     patchHttpViewNotification,
    //     {
    //         onSuccess: () => console.log('Success'),
    //         onError: console.log('On Error'),
    //     },
    // );

    const onPressNotification = async (
        notificationId: string,
        resourceId: number,
    ) => {
        // Need to update this functionalities
        await patchHttpViewNotification(notificationId);
        onRefetch();
        getCount(notifyUserRole);
        onClosePopup();
        setTimeout(() => {
            if (notifyUserRole === 'MANAGER') {
                getManagerModal(resourceId);
            }
        }, 1000);
    };

    return (
        <Modal
            onBackButtonPress={onClosePopup}
            useNativeDriver
            style={styles.modal}
            isVisible={isPopupVisible}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Header
                        visibleType={visibleType}
                        onChangeVisibleType={type => setVisibleType(type)}
                        onClose={onClosePopup}
                    />
                    <View style={styles.content}>
                        <FlatList
                            data={data?.items}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <NotificationContent
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
