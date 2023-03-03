import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, radius, scale } = theme;

export const styles = StyleSheet.create({
    modal: {
        margin: 0,
    },
    container: {
        backgroundColor: colors.white,
        borderRadius: radius.rd24,
        marginHorizontal: scale.sc10,
        padding: scale.sc20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainer: {
        marginHorizontal: 0,
    },
});
