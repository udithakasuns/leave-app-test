import { ColorValue, StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, radius, colors } = theme;

type ColorProp = {
    rightBorder: ColorValue;
    rightLabel: ColorValue;
    rightBackground: ColorValue;
    leftBorder: ColorValue;
    leftLabel: ColorValue;
    leftBackground: ColorValue;
    divider?: ColorValue;
};

type StyleProp = {
    isRightSelected?: boolean;
    isLeftSelected?: boolean;
    isError?: boolean;
};

export default ({ isLeftSelected, isRightSelected, isError }: StyleProp) => {
    const getColor = (): Partial<ColorProp> => {
        if (isLeftSelected) {
            return {
                leftBorder: colors.secondaryOutline,
                leftBackground: colors.secondaryBackground,
                leftLabel: colors.secondaryLabel,
            };
        }
        if (isRightSelected) {
            return {
                rightBorder: colors.secondaryOutline,
                rightBackground: colors.secondaryBackground,
                rightLabel: colors.secondaryLabel,
                leftLabel: colors.gray600,
            };
        }
        if (isError) {
            return {
                rightBorder: colors.error,
                rightBackground: colors.red50,
                rightLabel: colors.error,
                leftLabel: colors.error,
                leftBorder: colors.error,
                leftBackground: colors.red50,
                divider: colors.error,
            };
        }
        return {
            divider: colors.dividerColor,
            leftLabel: colors.secondaryLabel,
        };
    };

    return StyleSheet.create({
        halfButtonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        rightContainer: {
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderTopLeftRadius: radius.rd8,
            borderBottomLeftRadius: radius.rd8,
            borderBottomColor: getColor().rightBorder ?? colors.tertiaryColor,
            borderLeftColor: getColor().rightBorder ?? colors.tertiaryColor,
            borderTopColor: getColor().rightBorder ?? colors.tertiaryColor,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            paddingHorizontal: scale.vsc16,
            paddingVertical: scale.vsc16,
            backgroundColor: getColor().rightBackground ?? colors.tertiaryColor,
        },
        leftText: {
            color: getColor().rightLabel ?? colors.gray600,
        },
        rightText: {
            color: getColor().leftLabel,
        },
        leftContainer: {
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomColor: getColor().leftBorder ?? colors.tertiaryColor,
            borderRightColor: getColor().leftBorder ?? colors.tertiaryColor,
            borderTopColor: getColor().leftBorder ?? colors.tertiaryColor,
            borderTopRightRadius: radius.rd8,
            borderBottomRightRadius: radius.rd8,
            paddingHorizontal: scale.vsc16,
            paddingVertical: scale.vsc16,
            borderLeftWidth: 1,
            borderLeftColor: getColor().divider ?? colors.secondaryOutline,
            backgroundColor: getColor().leftBackground ?? colors.tertiaryColor,
        },
        initialIconLabelContainer: {
            width: '100%',
            justifyContent: 'space-between',
        },
        initialButtonContainer: {
            borderRadius: radius.rd8,
            justifyContent: 'space-between',
            flex: 1,
        },
    });
};
