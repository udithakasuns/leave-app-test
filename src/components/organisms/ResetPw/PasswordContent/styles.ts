import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 0,
        marginBottom: 0,
    },

    buttonReset: {
        alignSelf: 'flex-start',
        width: 'auto',
        minWidth: scale.sc160 + scale.sc40,
    },
    errorText: {
        marginVertical: scale.sc1,
    },
});
