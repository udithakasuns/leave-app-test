import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors } = theme;

export const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
