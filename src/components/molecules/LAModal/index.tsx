/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import Modal, { OnSwipeCompleteParams } from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './styles';

export type SheetProps = {
    isVisible: boolean;
    onClose: () => void;
    sheetBody: ReactElement;
};

const LAModal = ({ isVisible, onClose, sheetBody }: SheetProps) => {
    const insets = useSafeAreaInsets();

    const { container, bodyContainer } = styles(insets);

    return (
        <Modal
            isVisible={isVisible}
            style={container}
            onSwipeComplete={(params: OnSwipeCompleteParams) => {
                if (params.swipingDirection === 'down') {
                    onClose && onClose();
                }
            }}
            swipeDirection={['down']}>
            <View style={bodyContainer}>{sheetBody}</View>
        </Modal>
    );
};

export default LAModal;
