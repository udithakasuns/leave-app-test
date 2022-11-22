import { StyleSheet } from 'react-native';
import theme from 'utils/theme';

const { scale, colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale.sc20,
    },
    divider: {
        borderBottomWidth: scale.sc1,
        borderColor: colors.dividerColor,
    },
    buttonStyle: {
        marginTop: scale.sc12,
    },
    buttonLabelStyle: {
        marginLeft: scale.sc6,
    },
});
