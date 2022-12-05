import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNotificationStore } from 'src/store';
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
    const { isPopupVisible, setIsPopupVisible } = useNotificationStore();
    const [visibleType, setVisibleType] =
        useState<NotificationVisibleType>('all');

    // 1st check the user is in Employee view or Manager View
    // Then check the visible Type

    const {
        data,
        error,
        refetch: onRefetch,
    }: UseQueryResult<NotificationPayload, AxiosError> = useQuery(
        [isPopupVisible, visibleType],
        () => {
            if (isPopupVisible) {
                return getHttpNotifications(1, 8, 'MANAGER', visibleType);
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

    const onPressNotification = async (notificationId: string) => {
        // Need to update this functionalities
        await patchHttpViewNotification(notificationId);
        onRefetch();
    };

    return (
        <Modal
            onBackButtonPress={onClosePopup}
            useNativeDriver
            style={styles.modal}
            isVisible={isPopupVisible}>
            <Header
                visibleType={visibleType}
                onChangeVisibleType={type => setVisibleType(type)}
                onClose={onClosePopup}
            />
            <View style={styles.container}>
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
                                onPressNotification(item.id.toString())
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
        </Modal>
    );
};

export default LANotificationPopup;
