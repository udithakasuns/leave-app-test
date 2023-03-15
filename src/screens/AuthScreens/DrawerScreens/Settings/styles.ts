import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale } = theme;

export const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtonLabel: {
        marginLeft: scale.sc4,
    },
    modal: {
        // margin: 0,
        paddingBottom: scale.sc10,
        justifyContent: 'flex-end',
    },
});
