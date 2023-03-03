import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

interface Props {
    outline: boolean;
}

export const useStyles = ({ outline }: Props) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.tertiaryColor,
            borderRadius: radius.rd4,
            paddingHorizontal: scale.sc12,
            paddingVertical: scale.sc12,
            borderWidth: outline ? 1 : 0,
            borderColor: outline ? colors.dividerColor : 'transparent',
        },
    });
