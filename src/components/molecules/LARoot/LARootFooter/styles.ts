import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: scale.sc4,
    },
    text: {
        textDecorationLine: 'underline',
    },
    pipe: {
        marginHorizontal: scale.sc2,
    },
});
