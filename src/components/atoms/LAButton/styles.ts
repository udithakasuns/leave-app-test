/* eslint-disable no-nested-ternary */
import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';
import { AlignType, ButtonMode, ColorProp } from './types';

const { scale, radius, colors } = theme;

export default (
    mode: ButtonMode,
    alignContent: AlignType,
    containerPadding: number,
    iconColor?: string,
) => {
    const getColor = (): ColorProp => {
        switch (mode) {
            case 'outlined':
                return {
                    background: colors.secondaryBackground,
                    textIcon: colors.secondaryLabel,
                    borderColor: colors.primaryColor,
                };
            case 'contained-gray':
                return {
                    background: colors.tertiaryColor,
                    textIcon: colors.tertiaryLabel,
                };
            case 'outlined-error':
                return {
                    background: colors.red900,
                    textIcon: colors.errorLabel,
                    borderColor: colors.errorLabel,
                };
            case 'outlined-light-error':
                return {
                    background: colors.red50,
                    textIcon: colors.error,
                    borderColor: colors.error,
                };
            default:
                return {
                    background: colors.primaryColor,
                    textIcon: colors.black,
                };
        }
    };

    const getBorderWidth = () =>
        mode === 'outlined' ||
        mode === 'outlined-error' ||
        mode === 'outlined-light-error'
            ? 1
            : 0;

    return StyleSheet.create({
        buttonContainer: {
            width: '100%',
            borderRadius: radius.rd50,
            paddingVertical: containerPadding,
            justifyContent: 'center',
            paddingHorizontal: scale.sc24,
            alignItems: alignContent,
            backgroundColor: getColor().background,
            borderWidth: getBorderWidth(),
            borderColor: getColor().borderColor,
        },
        IconLabelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightIcon: {
            paddingLeft: scale.sc8,
            color: iconColor ?? getColor().textIcon,
        },
        leftIcon: {
            paddingLeft: scale.sc8,
            color: iconColor ?? getColor().textIcon,
        },
        labelContainer: {
            color: getColor().textIcon,
        },

        loadingContainer: {
            color: getColor().textIcon,
        },
    });
};
