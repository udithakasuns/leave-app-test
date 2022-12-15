import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale } = theme;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: colors.white,
    },
});
