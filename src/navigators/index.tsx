import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './RootNavigator';

const Navigators = () => (
    <NavigationContainer>
        <RootNavigator />
    </NavigationContainer>
);

export default Navigators;
