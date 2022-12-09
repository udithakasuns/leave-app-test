import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

export const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
    },
    itemText: { alignSelf: 'center' },
    chipContainer: {
        paddingVertical: theme.scale.sc10,
    },
    durationText: {
        paddingTop: theme.scale.vsc16,
        alignSelf: 'baseline',
    },
    durationContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    durationChip: { marginVertical: 3 },
    statusContainer: {
        backgroundColor: theme.colors.tertiaryColor,
    },
});
