import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from './navigators';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <RootNavigator />;
};

export default App;
