import React from 'react';
import { View } from 'react-native';
import Toast, { ToastProps } from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { ErrorCodes, getErrorMessage } from '../helpers/errorCodes';
import { getSuccessMessage, SuccessCodes } from '../helpers/successCodes';
import { TID_TOAST_SUB_TITLE, TID_TOAST_TITLE } from '../testIds';
import theme from '../theme';
import { styles } from './styles';

const { colors } = theme;

interface AlertProps extends ToastProps {
    props: {
        title: string;
        content: string;
        iconName?: string;
    };
}

export const toastConfig = {
    successToast: ({ props }: AlertProps) => (
        <View style={styles.successToastContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.leftSuccessContainer} />
                <Spacer width={5} />
                <Icon
                    name='check-circle'
                    color={colors.green200}
                    size={IconSize.small}
                />
                <Spacer width={5} />
                <View>
                    <Text testID={TID_TOAST_TITLE} type='ParaSMBold'>
                        {props.title}
                    </Text>
                    <Spacer height={1} />
                    <Text testID={TID_TOAST_SUB_TITLE} type='ParaXS'>
                        {props.content}
                    </Text>
                </View>
            </View>
            <View>
                <Icon
                    onPress={() => Toast.hide()}
                    name='close'
                    color={colors.black}
                    size={IconSize.small}
                />
            </View>
        </View>
    ),
    errorToast: ({ props }: AlertProps) => (
        <View style={styles.errorToastContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.leftErrorContainer} />
                <Spacer width={5} />
                <Icon name='info' color={colors.red500} size={IconSize.small} />
                <Spacer width={5} />
                <View style={styles.content}>
                    <Text testID={TID_TOAST_TITLE} type='ParaSMBold'>
                        {props.title}
                    </Text>
                    <Spacer height={0.1} />
                    <Text testID={TID_TOAST_SUB_TITLE} type='ParaXS'>
                        {props.content}
                    </Text>
                </View>
            </View>
            <View>
                <Icon
                    onPress={() => Toast.hide()}
                    name='close'
                    color={colors.black}
                    size={IconSize.small}
                />
            </View>
        </View>
    ),
};

export const showErrorToast = (
    errorCode: ErrorCodes,
    patchContent?: string,
) => {
    Toast.show({
        type: 'errorToast',
        props: {
            title: getErrorMessage(errorCode, patchContent).title,
            content: getErrorMessage(errorCode, patchContent).message,
        },
    });
};

export const showSuccessToast = (
    successCode: SuccessCodes,
    patchContent?: string,
) => {
    Toast.show({
        type: 'successToast',
        props: {
            title: getSuccessMessage(successCode, patchContent).title,
            content: getSuccessMessage(successCode, patchContent).message,
        },
    });
};
