import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.tertiaryColor,
        borderRadius: radius.rd8,
        paddingHorizontal: scale.sc12,
        paddingVertical: scale.sc12,
    },
    containerForLeave: {
        backgroundColor: colors.tertiaryColor,
        borderRadius: radius.rd8,
        paddingHorizontal: scale.sc12,
        paddingVertical: scale.sc12,
        borderColor: colors.gray300,
        borderWidth: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    chipsContainer: { alignSelf: 'flex-start' },
    chipContainerStyle: {
        paddingVertical: scale.sc6,
        paddingHorizontal: scale.vsc6,
    },
});
