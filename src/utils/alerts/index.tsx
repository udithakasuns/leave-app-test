import React from 'react';
import { View } from 'react-native';
import Toast, { ToastProps } from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import theme from '../theme';
import { styles } from './styles';

const { colors, scale, radius } = theme;

interface AlertProps extends ToastProps {
    props: {
        title: string;
        content: string;
        iconName?: string;
    };
}

export const toastConfig = {
    successToast: ({ props }: AlertProps) => (
        <View
            style={{
                width: '90%',
                borderRadius: theme.radius.rd4,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F7FEE7',
                padding: theme.scale.sc16,
                paddingHorizontal: theme.scale.vsc20,
                maxHeight: scale.vsc64,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        height: scale.vsc32,
                        borderWidth: 1,
                        borderColor: colors.approved,
                        borderRadius: radius.rd4,
                    }}
                />
                <Spacer width={5} />
                <Icon
                    name='check-circle'
                    color='#62B774'
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
};
