import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';
import Navigators from './navigators';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <Navigators />;
};

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(codePushOptions)(App);
