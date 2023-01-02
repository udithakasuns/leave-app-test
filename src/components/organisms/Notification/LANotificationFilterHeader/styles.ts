import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale } = theme;

export const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButtonStyle: {
        width: 'auto',
        alignSelf: 'flex-start',
        marginRight: scale.sc8,
    },
    headerDevider: {
        marginTop: scale.sc16,
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
});
