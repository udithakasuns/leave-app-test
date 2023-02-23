import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.tertiaryColor,
        borderRadius: radius.rd8,
        paddingHorizontal: scale.sc12,
        paddingVertical: scale.sc12,
    },
});
