import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import {
    useEmployeeStore,
    useManagerStore,
    useNotificationStore,
} from 'src/store';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'src/components/atoms';
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getHttpNotifications } from 'src/services/http';
import { NotificationPayload, NotificationVisibleType } from 'utils/types';
import { AxiosError } from 'axios';
import { NotificationContent } from 'src/components/molecules';
import { patchHttpViewNotification } from 'src/services/http/patchRequest';
import { NotificationFilterHeader } from 'components/organisms';
import { styles } from './styles';

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

    // 1st check the user is in Employee view or Manager View
    // Then check the visible Type

    const {
        data,
        error,
        refetch: onRefetch,
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
            onRefetch();
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
                            showsVerticalScrollIndicator={false}
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
