import { StyleSheet, ColorValue } from 'react-native';
import theme from 'src/utils/theme';

const { radius, scale, colors } = theme;

interface Props {
    outline: boolean;
    outlineColor: ColorValue | undefined;
    backgroundColor: ColorValue;
    disabled: boolean;
}

const styles = ({
    outline,
    outlineColor,
    disabled,
    backgroundColor,
}: Props) => {
    let containerBackgroundColor = backgroundColor || 'transparent';
    let containerBorderColor = outline
        ? outlineColor || colors.disabledColor
        : 'transparent';

    if (disabled) {
        containerBorderColor = outline ? colors.disabledColor : 'transparent';
        containerBackgroundColor = colors.tertiaryColor;
    }

    return StyleSheet.create({
        container: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: radius.rd64,
            borderWidth: outline ? 1 : 0,
            borderColor: containerBorderColor,
            backgroundColor: containerBackgroundColor,
            paddingHorizontal: scale.sc10,
            paddingVertical: scale.vsc12,
        },
        content: {
            marginHorizontal: scale.sc12,
        },
    });
};

export default styles;
