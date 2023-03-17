import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors, radius } = theme;

export const styles = StyleSheet.create({
    content: {
        marginTop: scale.sc10,
        backgroundColor: '#FAFAFA',
        padding: scale.sc20,
        borderRadius: radius.rd12,
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
    detailRow: {
        marginTop: scale.sc10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});
