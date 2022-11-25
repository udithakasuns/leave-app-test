import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, pixel } = theme;

export const styles = StyleSheet.create({
    container: {
        paddingVertical: scale.sc10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignContent: 'center',
        maxWidth: pixel(145),
        minWidth: pixel(145),
    },
    content: {
        alignSelf: 'center',
        marginHorizontal: scale.sc6,
        color: colors.gray600,
    },
    pressableContainer: {
        alignSelf: 'center',
    },
});
