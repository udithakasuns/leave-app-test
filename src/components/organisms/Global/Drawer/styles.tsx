import { StyleSheet } from 'react-native';
import theme from 'utils/theme';

const { scale, colors, pixel } = theme;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale.sc20,
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.dividerColor,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonStyle: {
        marginTop: scale.sc12,
    },
    buttonLabelStyle: {
        marginHorizontal: scale.sc8,
    },
});
