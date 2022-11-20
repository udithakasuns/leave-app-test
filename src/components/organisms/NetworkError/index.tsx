import React from 'react';
import { View, Text } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const NetworkError = () => {
    const { isConnected } = useNetInfo();

    if (isConnected) {
        return null;
    }

    return (
        <View>
            <Text>Network Error</Text>
        </View>
    );
};

export default NetworkError;
