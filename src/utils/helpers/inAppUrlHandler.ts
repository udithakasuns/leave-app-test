import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const inAppUrlHandler = async (url: string, redirectUrl: string) => {
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

export default inAppUrlHandler;
