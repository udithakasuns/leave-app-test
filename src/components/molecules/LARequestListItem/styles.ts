import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, ms, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: scale.vsc12,
    },
    dateContainer: {
        flexDirection: 'row',
        width: ms(75),
    },
    contentStyle: {
        marginHorizontal: scale.sc6,
    },
    containerStyle: {
        paddingVertical: scale.sc8,
        backgroundColor: colors.white,
    },
    pressableContainerStyle: {
        alignSelf: 'center',
    },
});
