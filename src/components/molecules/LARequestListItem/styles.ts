import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, pixel, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: scale.vsc12,
        minWidth: pixel(330),
    },
    dateContainer: {
        flexDirection: 'row',
        maxWidth: pixel(90),
        minWidth: pixel(90),
    },
    contentStyle: {
        flex: 1,
        marginHorizontal: scale.sc6,
    },
    containerStyle: {
        paddingVertical: scale.sc8,
        backgroundColor: colors.white,
        maxWidth: pixel(150),
        justifyContent: 'center',
        alignContent: 'center',
    },
    pressableContainerStyle: {
        alignSelf: 'center',
    },
});
