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
        marginLeft: scale.sc4,
        maxWidth: pixel(90),
        minWidth: pixel(90),
    },
    contentStyle: {
        flex: 1,
        marginHorizontal: scale.sc4,
    },
    containerStyle: {
        paddingVertical: scale.sc8,
        maxWidth: pixel(135),
        justifyContent: 'center',
        alignContent: 'center',
    },
    pressableContainerStyle: {
        alignSelf: 'center',
    },
});
