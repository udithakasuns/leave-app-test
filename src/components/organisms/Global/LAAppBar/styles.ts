import { StyleSheet } from 'react-native';
import { WIDTH } from 'src/utils/helpers/scalingUtil';
import theme from 'src/utils/theme';

const { scale, pixel, colors, radius } = theme;

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
    notificationCountContainer: {
        position: 'absolute',
        top: WIDTH(-2),
        left: WIDTH(-2),
        width: WIDTH(6),
        height: WIDTH(6),
        alignItems: 'center',
        justifyContent: 'center',
        // paddingLeft: 1,
        // paddingRight: 1,
        backgroundColor: colors.error,
        borderRadius: radius.rd50,
    },
});
