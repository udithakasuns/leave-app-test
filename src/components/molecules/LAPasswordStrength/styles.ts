import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

export const styles = StyleSheet.create({
    srokeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stroke: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: colors.dividerColor,
    },
    strokeTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ruleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scale.sc1,
    },
});
