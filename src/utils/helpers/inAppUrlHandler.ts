import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export const inAppAuthUrlHandler = async (url: string, redirectUrl: string) => {
    await InAppBrowser.isAvailable();
    const { type, url: newUrl }: any = await InAppBrowser.openAuth(
        url,
        redirectUrl,
        {
            showTitle: true,
            enableUrlBarHiding: true,
            enableDefaultShare: false,
            ephemeralWebSession: false,
            forceCloseOnRedirection: false,
            showInRecents: true,
        },
    );

    if (type === 'success') {
        Linking.openURL(newUrl);
    }
};

export const inAppNormalUrlHandler = async (url: string) => {
    await InAppBrowser.isAvailable();
    InAppBrowser.open(url);
};

// const inAppUrlHandler = async (url: string, redirectUrl: string) => {
//     if (await InAppBrowser.isAvailable()) {
//         if (!url.includes('logout')) {
//             const { type, url: newUrl }: any = await InAppBrowser.openAuth(
//                 url,
//                 redirectUrl,
//                 {
//                     modalEnabled: false,
//                     showTitle: false,
//                     enableUrlBarHiding: false,
//                     enableDefaultShare: false,
//                     ephemeralWebSession: false,
//                     forceCloseOnRedirection: false,
//                     showInRecents: true,
//                 },
//             );
//             if (type === 'success') {
//                 Linking.openURL(newUrl);
//             }
//         }
//     }
// };
