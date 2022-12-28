import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

export const styles = StyleSheet.create({
    itemRowFlexEnd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
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
    durationContainerFlexEnd: {
        flex: 1,
        flexDirection: 'row-reverse',
        flexWrap: 'wrap',
        // justifyContent: 'flex-end',
    },
    durationContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    durationChip: { marginVertical: 2, paddingHorizontal: theme.scale.sc2 },
    statusContainer: {
        backgroundColor: theme.colors.tertiaryColor,
    },
});
