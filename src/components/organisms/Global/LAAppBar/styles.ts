import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, pixel } = theme;

export const styles = StyleSheet.create({
    appBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: pixel(8),
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
        marginBottom: theme.scale.vsc40,
    },
    labelStyle: { paddingHorizontal: 10 },
});
