import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors, ms } = theme;

export const styles = StyleSheet.create({
    commonStyle: {
        paddingBottom: scale.sc24,
    },
    contentStyle: {
        flex: 1,
        marginHorizontal: scale.sc6,
    },
    containerStyle: {
        paddingVertical: scale.sc8,
        backgroundColor: colors.white,
        maxWidth: ms(120),
        minWidth: ms(120),
        maxHeight: ms(38),
        justifyContent: 'center',
        alignContent: 'center',
    },
});
