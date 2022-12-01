/* eslint-disable no-console */
import { useEffect } from 'react';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { postHttpNotificationRegister } from 'src/services/http';
// import PushNotification from 'react-native-push-notification';

type Props = {
    isAuthenticated: boolean;
};

// PushNotification.createChannel(
//     {
//         channelId: 'channel-id',
//         channelName: 'Channel Name',
//         channelDescription: 'To hadle the notification comming from firebase',
//         playSound: true,
//         soundName: 'default',
//         importance: 4,
//         vibrate: true,
//     },
//     created => console.log('Notification channel created: ', created),
// );

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled from background', remoteMessage);
    // PushNotification.localNotification({
    //     title: remoteMessage.notification?.title,
    //     message: remoteMessage.notification?.body || '',
    //     bigPictureUrl: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
    //     smallIcon: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
    //     channelId: 'channel-id',
    //     vibrate: true,
    // });
});

export const useNotifications = ({ isAuthenticated }: Props) => {
    useEffect(() => {
        console.log('*** FCM ***');
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            );
            // PushNotification.localNotification({
            //     title: remoteMessage.notification?.title,
            //     message: remoteMessage.notification?.body || '',
            //     bigPictureUrl: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
            //     smallIcon: remoteMessage.notification?.android?.imageUrl, // Handle this to IOS,
            //     channelId: 'channel-id',
            //     vibrate: true,
            // });
        });

        return unsubscribe;
    }, []);

    const getNotificationToken = async () => {
        const deviceToken = await messaging().getToken();
        if (deviceToken) {
            console.log({ deviceToken });
            const deviceType = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
            const isRegistered = await postHttpNotificationRegister(
                deviceToken,
                deviceType,
            );
            if (isRegistered) {
                // Flag in zustand where the device has been registered
                // Call to the notification get API via zustand
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
            // Check the zustand flag, whether the device has registered or not.
            // If not, then call the following method, otherwise you don't need to register the device again and Call to the notification get API via zustand
            getNotificationToken();
        }
    }, [isAuthenticated]);
};
