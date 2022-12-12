import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-start',
    },
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
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: scale.sc20,
        borderRadius: radius.rd24,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
});
