import React from 'react';
import NetworkError from './components/organisms/NetworkError';
import RootNavigator from './navigators';

const App: React.FC = () => (
    <>
        <RootNavigator />
        <NetworkError />
    </>
);

export default App;
