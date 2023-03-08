import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, pixel } = theme;

export const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: scale.sc10,
    },
    inputView: {
        margin: 0,
    },
    inputContainer: {
        marginTop: 0,
        paddingHorizontal: 0,
        minWidth: pixel(58),
        paddingVertical: scale.vsc12,
    },
    input: {
        textAlign: 'center',
    },
});
