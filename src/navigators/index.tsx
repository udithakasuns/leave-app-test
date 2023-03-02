import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LANotificationPopup from 'src/components/organisms/Global/LANotificationPopup';
import LANetworkError from 'src/components/organisms/Global/LANetworkError';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './RootNavigator';

const queryClient = new QueryClient();

const Navigators = () => (
    <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigator />
                <LANotificationPopup />
                <LANetworkError />
            </NavigationContainer>
        </SafeAreaProvider>
    </QueryClientProvider>
);

export default Navigators;
