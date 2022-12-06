/* eslint-disable no-nested-ternary */

import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';
import { InputTypes } from './types';

interface Props {
    disabled: boolean;
    type: InputTypes;
    error: boolean;
    focused: boolean;
    value: string | undefined;
}

const { colors, fontFamily, scale } = theme;

const styles = ({ type, disabled, focused, value, error }: Props) => {
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

    const inputContainerComment = disabled
        ? colors.disabledColor
        : error
        ? colors.error
        : colors.secondaryOutline;

    const inputContainerBackgroundColor = disabled
        ? 'transparent'
        : error
        ? colors.errorBackground
        : focused || value
        ? colors.white
        : colors.tertiaryColor;

    const inputContainerBackgroundColorComment = disabled
        ? 'transparent'
        : error
        ? colors.errorBackground
        : focused || value
        ? colors.secondaryBackground
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
            color: labelColor,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: disabled || error || focused || value ? 1 : 0,
            shadowColor: focused ? colors.black : 'transparent',
            shadowRadius: focused ? 0.2 : 0,
            shadowOpacity: focused ? 0.2 : 0,
            shadowOffset: { width: focused ? 2 : 0, height: focused ? 2 : 0 },
            elevation: focused ? 5 : 0,
            borderColor:
                type === 'COMMENT'
                    ? inputContainerComment
                    : inputContainerBoarderColor,
            backgroundColor:
                type === 'COMMENT'
                    ? inputContainerBackgroundColorComment
                    : inputContainerBackgroundColor,
            borderRadius: theme.radius.rd8,
            paddingVertical: type === 'SMALL' ? scale.vsc10 : scale.vsc16,
            paddingHorizontal: scale.sc16,
            marginTop: scale.vsc8,
        },

        input: {
            flex: 1,
            marginHorizontal: scale.sc6,
            fontFamily: fontFamily.poppins400,
            color: inputColor,
            padding: 0,
        },
        commentInput: {
            minHeight: scale.vsc80,
            textAlignVertical: 'top',
            color: colors.secondaryLabel,
        },
        caption: {
            color: captionColor,
        },
    });
};

export default styles;
