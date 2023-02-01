import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import Navigators from './navigators';
import {
    CODEPUSH_DEPLOYMENT_KEY_ANDROID,
    CODEPUSH_DEPLOYMENT_KEY_IOS,
} from './configs';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <Navigators />;
};

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

/* Based on the Key, new app updates will be reflacted in particular environments */
codePush.sync({
    installMode: codePush.InstallMode.IMMEDIATE,
    deploymentKey:
        Platform.OS === 'ios'
            ? CODEPUSH_DEPLOYMENT_KEY_IOS
            : CODEPUSH_DEPLOYMENT_KEY_ANDROID,
});

export default codePush(codePushOptions)(App);
