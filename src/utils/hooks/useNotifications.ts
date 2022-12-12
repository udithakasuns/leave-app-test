/* eslint-disable no-console */
import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { postHttpNotificationRegister } from 'src/services/http';
import PushNotification from 'react-native-push-notification';
import { usePersistStore, useNotificationStore, useUserStore } from 'src/store';
import uuid from 'react-native-uuid';

type Props = {
    isAuthenticated: boolean;
};

PushNotification.createChannel(
    {
        channelId: 'channel-id',
        channelName: 'Channel Name',
        channelDescription: 'To hadle the notification comming from firebase',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
    },
    created => console.log('Notification channel created: ', created),
);

export const useNotifications = ({ isAuthenticated }: Props) => {
    const persistStore = usePersistStore();
    const notificationStore = useNotificationStore();
    const { user } = useUserStore();

    console.log('NotifyUser:', notificationStore.notifyUserRole);

    const requestUserPermission = async () => {
        console.log('requestUserPermission');
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        } else {
            Alert.alert('PERMISSIONS', 'Enable permissions');
            // Show a popup to request permisions for notifications
        }
    };

    const getNotificationCountByUserRole = () => {
        if (user.role === 'manager') {
            notificationStore.getCount('MANAGER');
        } else {
            notificationStore.getCount('EMPLOYEE');
        }
    };

    useEffect(() => {
        /* 
            Following will be triggered When user is in background mode or user has quite from the app.
        */
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log('Message handled from background', remoteMessage);

            PushNotification.localNotification({
                title: remoteMessage.notification?.title,
                message:
                    JSON.parse(remoteMessage.notification?.body).message || '',
                bigPictureUrl: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
                smallIcon: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
                channelId: 'channel-id',
                vibrate: true,
            });
            notificationStore.getCount(notificationStore.notifyUserRole);
        });

        /* 
            Following event is being listened to the notifications when the user in
            foreground mode(focus in to the app). If new notification comes, it will 
            trigger the notification count API based on the currently selected user.  
        */
        const unsubscribe = messaging().onMessage(message => {
            console.log({ message });
            notificationStore.getCount(notificationStore.notifyUserRole);
        });

        return unsubscribe;
    }, [notificationStore.notifyUserRole]);

    const getNotificationToken = async () => {
        // Each device will generate an uniqe token and it will be passed to the backend.
        const deviceToken = await messaging().getToken();
        if (deviceToken) {
            // An unique id will be created for every device, which allows backend identify devices seperately.
            const deviceType = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
            const deviceUniqueId = `${uuid.v4()}-${deviceType}-${user.userId.toString()}`;

            const isRegistered = await postHttpNotificationRegister(
                deviceToken,
                deviceType,
                deviceUniqueId,
            );
            if (isRegistered) {
                // Save device unique to the zustand persist store for future usage.
                persistStore.setDeviceUniqueId(deviceUniqueId);
                getNotificationCountByUserRole();
            } else {
                // Handle the error here
            }
        } else {
            // Handle the error here
        }
    };

    useEffect(() => {
        /* Only authenticated users can register for the notification device token unless the user has already registered */
        if (isAuthenticated) {
            if (persistStore.deviceUniqueId) {
                getNotificationCountByUserRole();
            } else {
                getNotificationToken();
            }
        }
    }, [isAuthenticated]);
};
