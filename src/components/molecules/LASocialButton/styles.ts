import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { pixel, radius, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.secondaryColor,
        paddingVertical: pixel(18),
        borderColor: colors.primaryColor,
        borderWidth: 1.5,
        borderRadius: radius.rd50,
    },
});
