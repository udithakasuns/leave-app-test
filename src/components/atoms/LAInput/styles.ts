/* eslint-disable no-nested-ternary */

import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';
import { InputTypes } from './types';

interface Props {
    disabled: boolean;
    type: InputTypes;
    error: boolean;
    focused: boolean;
    value: string;
}

const { colors, fontSize, scale } = theme;

export const styles = ({ type, disabled, focused, value, error }: Props) =>
    StyleSheet.create({
        container: {
            margin: scale.sc8,
        },
        label: {
            fontWeight: type === 'COMMENT' ? '400' : '500',
            fontSize:
                type === 'LARGE'
                    ? fontSize.fs18
                    : type === 'SMALL'
                    ? fontSize.fs14
                    : fontSize.fs16,
            color: disabled
                ? colors.disabledColor
                : error
                ? colors.error
                : colors.black,
        },
        inputContainer: {
            flexDirection: 'row',
            borderWidth: disabled || error || focused || value ? scale.vsc1 : 0,
            borderColor: disabled
                ? colors.disabledColor
                : error
                ? colors.error
                : colors.black,
            backgroundColor: disabled
                ? 'transparent'
                : error
                ? colors.errorBackground
                : focused || value
                ? colors.white
                : colors.tertiaryColor,
            borderRadius: theme.radius.rd8,
            paddingVertical: type === 'SMALL' ? scale.vsc10 : scale.vsc16,
            paddingHorizontal: scale.sc16,
            marginTop: scale.vsc8,
        },

        input: {
            flex: 1,
            marginHorizontal: scale.sc6,
            color: disabled
                ? colors.disabledColor
                : error
                ? colors.error
                : colors.black,
        },
        commentInput: {
            minHeight: scale.vsc110,
        },
        caption: {
            fontSize: fontSize.fs12,
            color: disabled
                ? colors.disabledColor
                : error
                ? colors.error
                : colors.primaryGray,
            marginTop: scale.vsc8,
        },
    });

export default styles;
