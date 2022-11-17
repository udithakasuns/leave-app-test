import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, radius, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: colors.secondaryColor,
        paddingVertical: scale.vsc20,
        borderColor: colors.primaryColor,
        borderWidth: scale.sc1,
        borderRadius: radius.rd50,
    },
});
