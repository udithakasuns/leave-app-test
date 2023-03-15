import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { fontSize } = theme;

export const styles = StyleSheet.create({
    unicode: {
        fontSize: fontSize.fs40,
    },
    button: {
        width: 'auto',
        alignSelf: 'flex-start',
    },
});
