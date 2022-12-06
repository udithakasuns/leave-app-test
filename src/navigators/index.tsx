import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './RootNavigator';

const queryClient = new QueryClient();

const Navigators = () => (
    <QueryClientProvider client={queryClient}>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    </QueryClientProvider>
);

export default Navigators;
