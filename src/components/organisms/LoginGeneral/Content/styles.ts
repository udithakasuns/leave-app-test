import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    forgotPwText: {
        textDecorationLine: 'underline',
    },
    bottomText: {
        alignSelf: 'center',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    inputContainer: {
        marginHorizontal: 0,
        marginBottom: 0,
    },
    input: {
        borderWidth: 0,
        backgroundColor: colors.tertiaryColor,
    },
    errorText: {
        marginVertical: scale.sc1,
    },
});
