/* eslint-disable no-nested-ternary */
import { StyleSheet, ColorValue } from 'react-native';
import theme from 'src/utils/theme';
import { ButtonMode, AlignType, ButtonSize } from './types';

const { scale, radius, colors } = theme;

type ColorProp = {
    background: ColorValue;
    textIcon: ColorValue;
    borderColor?: ColorValue;
};

export default (
    mode: ButtonMode,
    alignContent: AlignType,
    size: ButtonSize,
) => {
    const getColor = (): ColorProp => {
        switch (mode) {
            case 'outlined':
                return {
                    background: colors.secondaryColor,
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
                    background: colors.errorBackground,
                    textIcon: colors.errorLabel,
                    borderColor: colors.errorLabel,
                };
            default:
                return {
                    background: colors.primaryColor,
                    textIcon: colors.black,
                };
        }
    };

    const getBorderWidth = () =>
        mode === 'outlined' || mode === 'outlined-error' ? 1.5 : 0;

    const getPaddingBySize = () =>
        size === 'large'
            ? scale.vsc16
            : size === 'medium'
            ? scale.vsc12
            : scale.vsc10;

    return StyleSheet.create({
        buttonContainer: {
            width: '100%',
            borderRadius: radius.rd50,
            paddingVertical: getPaddingBySize(),
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
            paddingRight: scale.sc12,
            color: getColor().textIcon,
        },
        leftIcon: {
            paddingLeft: scale.sc12,
            color: getColor().textIcon,
        },
        labelContainer: {
            marginTop: scale.vsc2,
            color: getColor().textIcon,
        },

        loadingContainer: {
            color: getColor().textIcon,
        },
    });
};
