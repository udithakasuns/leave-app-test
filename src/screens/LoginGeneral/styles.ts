import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

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
    bottomText: {
        alignSelf: 'center',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
