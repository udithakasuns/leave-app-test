import React from 'react';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';

const { colors } = theme;

interface Props {
    isVisible?: boolean;
    backdropOpacity: number;
}

const LAModalLoder = ({
    isVisible = true,
    backdropOpacity = 0.7,
}: PartialBy<Props, 'backdropOpacity'>) => {
    if (!isVisible) {
        return null;
    }
    return (
        <Modal
            useNativeDriver
            backdropOpacity={backdropOpacity}
            isVisible={isVisible}
            animationOutTiming={1}
            animationOut='fadeOut'>
            <ActivityIndicator size='large' color={colors.primaryColor} />
        </Modal>
    );
};

export default LAModalLoder;
