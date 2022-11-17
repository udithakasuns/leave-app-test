/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    StyleProp,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { TestProps } from 'src/utils/types';
import { styles } from './style';

type DefaultHeaderProps = {
    title: string;
    subTitle: string;
};

interface Props extends Partial<TestProps> {
    defaultHeader?: DefaultHeaderProps;
    bodyChildren: ReactNode;
    bodyStyle?: StyleProp<ViewStyle> | undefined;
    onClose: () => void;
    modalVisible: boolean;
    popupStyle?: StyleProp<ViewStyle> | undefined;
}

const LAPopUp: React.FC<Props> = ({
    testId = 'ATOM_AC_MODAL_TEST',
    defaultHeader,
    bodyChildren,
    bodyStyle,
    modalVisible,
    popupStyle,
    onClose,
}) => {
    const DefaultHeaderContainer = () => (
        <View style={styles.headerContainer}>
            <Text type='H2Bold' style={{ textAlign: 'center' }}>
                {defaultHeader?.title}
            </Text>
            <Spacer height={5} />
            <Text type='ParaLG' color='#737373' style={{ textAlign: 'center' }}>
                {defaultHeader?.subTitle}
            </Text>
        </View>
    );

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            onRequestClose={onClose}>
            <TouchableOpacity
                style={[styles.popupContainer, popupStyle]}
                activeOpacity={1}
                onPressOut={onClose}>
                <TouchableWithoutFeedback>
                    <KeyboardAvoidingView behavior='position' enabled>
                        <View testID={testId} accessible={false}>
                            <View style={styles.container}>
                                {defaultHeader && <DefaultHeaderContainer />}
                                <View style={bodyStyle}>{bodyChildren}</View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default LAPopUp;
