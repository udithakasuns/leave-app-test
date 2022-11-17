import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, ms } = theme;

export const styles = StyleSheet.create({
    container: {
        paddingVertical: scale.sc10,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignContent: 'center',
        maxWidth: ms(120),
        minWidth: ms(120),
        maxHeight: ms(38),
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
