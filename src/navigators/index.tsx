import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LANotificationPopup from 'src/components/organisms/Global/LANotificationPopup';
import LANetworkError from 'src/components/organisms/Global/LANetworkError';
import LAGlobalManager from 'src/components/organisms/Global/LAGlobalManager';
import LAGlobalEmployee from 'src/components/organisms/Global/LAGlobalEmployee';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './RootNavigator';

const queryClient = new QueryClient();

const Navigators = () => (
    <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigator />
                <LANotificationPopup />
                <LAGlobalEmployee />
                <LAGlobalManager />
                <LANetworkError />
            </NavigationContainer>
        </SafeAreaProvider>
    </QueryClientProvider>
);

export default Navigators;
