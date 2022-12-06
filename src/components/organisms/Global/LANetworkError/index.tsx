import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { ErrorPopup } from 'components/organisms';

const LANetworkError = () => {
    const { isConnected } = useNetInfo();

    if (isConnected || isConnected === null) {
        return null;
    }

    // Need to add secondary button on press to navigate to help pages
    return <ErrorPopup visible type='network' onClose={() => {}} />;
};

export default LANetworkError;
