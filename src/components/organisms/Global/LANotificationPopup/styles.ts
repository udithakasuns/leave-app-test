import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-start',
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: scale.sc20,
        borderRadius: radius.rd24,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
