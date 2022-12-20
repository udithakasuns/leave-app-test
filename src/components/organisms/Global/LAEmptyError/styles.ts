import { StyleSheet } from 'react-native';
import theme from 'utils/theme';

const { fontSize, scale } = theme;

export const styles = StyleSheet.create({
    container: {
        marginTop: scale.vsc10,
    },
    emoji: {
        fontSize: fontSize.fs24,
        textAlign: 'center',
    },
    headerContainer: {
        alignSelf: 'center',
        marginBottom: theme.scale.vsc4,
    },
    headerText: {
        textAlign: 'center',
    },
});
