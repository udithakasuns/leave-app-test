/* eslint-disable react/no-unstable-nested-components */
import React, { ReactElement, ReactNode } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import Modal, { OnSwipeCompleteParams } from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { toastConfig } from 'src/utils/alerts';
import { PartialBy } from 'src/utils/types';

import styles from './styles';

export type SheetProps = {
    testIdModal: string;
    isVisible: boolean;
    onClose: () => void;
    sheetBody: ReactElement;
    header: string;
    headerIcon: string;
    headerRightContent: ReactNode;
    style: StyleProp<ViewStyle>;
};

const LAModal = ({
    testIdModal,
    isVisible = false,
    onClose,
    sheetBody,
    header,
    headerIcon = 'close',
    headerRightContent,
    style,
}: PartialBy<
    SheetProps,
    'header' | 'headerIcon' | 'style' | 'testIdModal' | 'headerRightContent'
>) => {
    const insets = useSafeAreaInsets();

    const { container, bodyContainer, headerContainer, headerRightContainer } =
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
            <View style={headerRightContainer}>
                <Text type='H1Bold'>{header}</Text>
                <View>{headerRightContent}</View>
            </View>
        </View>
    );
    return (
        <Modal
            testID={testIdModal}
            isVisible={isVisible}
            style={container}
            useNativeDriver
            avoidKeyboard
            propagateSwipe
            // commented reason : Following code base helps to close the modal when user slide down the modal, but it affects to the smoothness of the scrolling
            // onSwipeComplete={(params: OnSwipeCompleteParams) => {
            //     if (params.swipingDirection === 'down') {
            //         onClose();
            //     }
            // }}
            // swipeDirection={['down']}
            onBackButtonPress={onClose}>
            <View style={[bodyContainer, style]}>
                <ScrollView
                    // automaticallyAdjustKeyboardInsets // commented reson: This will leads to show extra space in some modals with input(when pressing the input field)
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
