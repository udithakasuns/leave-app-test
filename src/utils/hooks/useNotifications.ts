/* eslint-disable no-console */
import notifee, {
    AuthorizationStatus,
    AndroidImportance,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import { postHttpNotificationRegister } from 'src/services/http';
import { useNotificationStore, usePersistStore, useUserStore } from 'src/store';

type Props = {
    isAuthenticated: boolean;
};

export const useNotifications = ({ isAuthenticated }: Props) => {
    const persistStore = usePersistStore();
    const notificationStore = useNotificationStore();
    const { user } = useUserStore();

    const requestUserPermission = async () => {
        const settings = await notifee.requestPermission();

        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log('Permission settings:', settings.ios);
        } else {
            console.log('User declined permissions');
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
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            notificationStore.getCount(notificationStore.notifyUserRole);
        });

        /* 
            Following event is being listened to the notifications when the user in
            foreground mode(focus in to the app). If new notification comes, it will 
            trigger the notification count API based on the currently selected user.  
        */
        const unsubscribe = messaging().onMessage(async message => {
            // Create a channel (required for Android)
            const channelId = await notifee.createChannel({
                id: 'defualt-channel',
                name: 'Channel For Notification',
                vibration: true,
                importance: AndroidImportance.HIGH,
            });
            await notifee.displayNotification({
                title: message.notification?.title,
                body: message.notification?.body || '',
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    smallIcon: 'ic_small_icon',
                    color: '#FBBF24',
                    // eslint-disable-next-line global-require
                    largeIcon: require('../../assets/images/icon.png'),
                },
                ios: {
                    foregroundPresentationOptions: {
                        sound: true,
                        banner: true,
                        list: true,
                    },
                    interruptionLevel: 'timeSensitive',
                },
            });
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

    useEffect(() => {
        requestUserPermission();
    }, []);
};
