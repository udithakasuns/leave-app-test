import React from 'react';
import { View } from 'react-native';
import Toast, { ToastProps } from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
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
                    <Text type='ParaSMBold'>{props.title}</Text>
                    <Spacer height={1} />
                    <Text type='ParaXS'>{props.content}</Text>
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
                <View>
                    <Text type='ParaSMBold'>{props.title}</Text>
                    <Spacer height={1} />
                    <Text type='ParaXS'>{props.content}</Text>
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
