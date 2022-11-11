import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, ms, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: scale.vsc12,
        minWidth: ms(330),
    },
    dateContainer: {
        flexDirection: 'row',
        minWidth: ms(65),
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
        mHeight: ms(38),
    },
    pressableContainerStyle: {
        alignSelf: 'center',
    },
});
