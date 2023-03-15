import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    resentText: {
        flex: 1,
        marginRight: scale.sc1,
    },
    button: {
        alignSelf: 'flex-end',
        width: 'auto',
    },
});
