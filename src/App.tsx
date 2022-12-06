import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import LANetworkError from './components/organisms/Global/LANetworkError';
import RootNavigator from './navigators';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <>
            <RootNavigator />
            <LANetworkError />
        </>
    );
};

export default App;
