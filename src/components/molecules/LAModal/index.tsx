/* eslint-disable react/no-unstable-nested-components */
import React, { ReactElement } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import Modal, { OnSwipeCompleteParams } from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { toastConfig } from 'src/utils/alerts';
import { PartialBy } from 'src/utils/types';

import styles from './styles';

export type SheetProps = {
    isVisible: boolean;
    onClose: () => void;
    sheetBody: ReactElement;
    header: string;
    headerIcon: string;
    style: StyleProp<ViewStyle>;
};

const LAModal = ({
    isVisible = false,
    onClose,
    sheetBody,
    header,
    headerIcon = 'close',
    style,
}: PartialBy<SheetProps, 'header' | 'headerIcon' | 'style'>) => {
    const insets = useSafeAreaInsets();

    const { container, bodyContainer, headerContainer, safeAreaContainer } =
        styles(insets);
    const DefaultHeaderContainer = () => (
        <View style={headerContainer}>
            <Icon
                name={headerIcon}
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
            animationInTiming={250}
            avoidKeyboard
            onSwipeComplete={(params: OnSwipeCompleteParams) => {
                if (params.swipingDirection === 'down') {
                    onClose();
                }
            }}
            swipeDirection={['down']}>
            <View style={[bodyContainer, style]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>
                    {header && <DefaultHeaderContainer />}
                    {sheetBody}
                </ScrollView>
                <Toast
                    config={toastConfig}
                    position='bottom'
                    bottomOffset={30}
                    autoHide
                />
            </View>
        </Modal>
    );
};

export default LAModal;
