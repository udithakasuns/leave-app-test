import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import NetworkError from './components/organisms/NetworkError';
import RootNavigator from './navigators';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <>
            <RootNavigator />
            <NetworkError />
        </>
    );
};

export default App;
