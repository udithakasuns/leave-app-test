import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    appBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avatarChipContainer: { flexDirection: 'row' },
    chipContent: {
        marginRight: scale.sc4,
    },
    chipPressContainer: {
        alignSelf: 'center',
    },
    chipContainer: {
        paddingVertical: scale.sc8,
        paddingHorizontal: scale.sc10,
        paddingRight: scale.sc12,
    },
    roleSheetContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.scale.sc20,
        marginBottom: theme.scale.vsc40,
        marginTop: theme.scale.vsc26,
    },
    closeIcon: {
        alignSelf: 'flex-start',
        marginLeft: theme.scale.sc10,
    },
    roleTextContainer: {
        alignSelf: 'flex-start',
        marginLeft: theme.scale.sc10,
    },
    labelStyle: { paddingHorizontal: 10 },
});
