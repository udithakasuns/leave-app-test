import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigators from './navigators';

const App: React.FC = () => {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return <Navigators />;
};

export default App;
