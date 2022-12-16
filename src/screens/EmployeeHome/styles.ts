import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    innerContainer: {
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        bottom: 20,
    },
    scrollContainer: { marginBottom: scale.vsc80 },
});
