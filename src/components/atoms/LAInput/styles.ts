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

export const styles = ({ type, disabled, focused, value, error }: Props) => {
    const labelFontSize =
        type === 'LARGE'
            ? fontSize.fs18
            : type === 'SMALL'
            ? fontSize.fs14
            : fontSize.fs16;

    const labelColor = disabled
        ? colors.disabledColor
        : error
        ? colors.error
        : colors.black;

    const inputContainerBoarderColor = disabled
        ? colors.disabledColor
        : error
        ? colors.error
        : colors.black;

    const inputContainerBackgroundColor = disabled
        ? 'transparent'
        : error
        ? colors.errorBackground
        : focused || value
        ? colors.white
        : colors.tertiaryColor;

    const inputColor = disabled
        ? colors.disabledColor
        : error
        ? colors.error
        : colors.black;

    const captionColor = disabled
        ? colors.disabledColor
        : error
        ? colors.error
        : colors.primaryGray;

    return StyleSheet.create({
        container: {
            margin: scale.sc8,
        },
        label: {
            fontWeight: type === 'COMMENT' ? '400' : '500',
            fontSize: labelFontSize,
            color: labelColor,
        },
        inputContainer: {
            flexDirection: 'row',
            borderWidth: disabled || error || focused || value ? scale.vsc1 : 0,
            borderColor: inputContainerBoarderColor,
            backgroundColor: inputContainerBackgroundColor,
            borderRadius: theme.radius.rd8,
            paddingVertical: type === 'SMALL' ? scale.vsc10 : scale.vsc16,
            paddingHorizontal: scale.sc16,
            marginTop: scale.vsc8,
        },

        input: {
            flex: 1,
            marginHorizontal: scale.sc6,
            color: inputColor,
        },
        commentInput: {
            minHeight: scale.vsc110,
        },
        caption: {
            fontSize: fontSize.fs12,
            color: captionColor,
            marginTop: scale.vsc8,
        },
    });
};

export default styles;
