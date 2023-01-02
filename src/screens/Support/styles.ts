import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale } = theme;

export const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
    detailRow: {
        marginTop: scale.sc10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    urlContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconStyle: {
        marginLeft: scale.sc10,
    },
});
