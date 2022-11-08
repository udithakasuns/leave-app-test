/* eslint-disable react/no-unstable-nested-components */
import React, { ReactElement } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Modal, { OnSwipeCompleteParams } from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { PartialBy } from 'src/utils/types';

import styles from './styles';

export type SheetProps = {
    isVisible: boolean;
    onClose: () => void;
    sheetBody: ReactElement;
    header: string;
    style: StyleProp<ViewStyle>;
};

const LAModal = ({
    isVisible,
    onClose,
    sheetBody,
    header,
    style,
}: PartialBy<SheetProps, 'header' | 'style'>) => {
    const insets = useSafeAreaInsets();

    const { container, bodyContainer, headerContainer } = styles(insets);
    const DefaultHeaderContainer = () => (
        <View style={headerContainer}>
            <Icon
                name='close'
                enableBackground
                size={IconSize.medium}
                increasePadding={2}
                onPress={onClose}
            />
            <Spacer height={8} />
            <Text type='H1Bold'>{header}</Text>
        </View>
    );
    return (
        <Modal
            isVisible={isVisible}
            style={container}
            onSwipeComplete={(params: OnSwipeCompleteParams) => {
                if (params.swipingDirection === 'down') {
                    onClose();
                }
            }}
            swipeDirection={['down']}>
            <View style={[bodyContainer, style]}>
                {header && <DefaultHeaderContainer />}
                {sheetBody}
            </View>
        </Modal>
    );
};

export default LAModal;
