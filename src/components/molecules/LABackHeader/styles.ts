import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: scale.sc10,
    },
    backIconContainer: {
        backgroundColor: colors.gray300,
        padding: scale.sc10,
        borderRadius: radius.rd50,
    },
});
