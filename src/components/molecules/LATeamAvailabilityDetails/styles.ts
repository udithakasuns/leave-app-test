import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors, fontFamily, fontSize, pixel } = theme;

export const styles = StyleSheet.create({
    detailRow: {
        marginTop: scale.sc10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    detailRowLeft: {
        flex: 1,
        flexDirection: 'row',
    },
    detailRowRight: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scale.sc24,
    },
    statusChip: {
        paddingVertical: pixel(0),
        paddingHorizontal: pixel(0),
        marginLeft: pixel(4),
    },
    availableCountStyle: {
        fontSize: fontSize.fs20,
        fontFamily: fontFamily.poppins700,
        lineHeight: pixel(30),
    },
    awayTeamMembersDetails: {
        flexDirection: 'row',
    },
    avatarStyle: {
        marginLeft: pixel(-15),
        borderColor: colors.white,
        borderWidth: 1,
    },
    plusIconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scale.sc36,
        width: scale.sc36,
        borderRadius: scale.sc36 / 2,
        marginLeft: pixel(-15),
        backgroundColor: colors.white,
    },
    plusIconValue: {
        color: colors.iconLabel,
    },
    awayStatusChip: {
        marginLeft: pixel(-20),
        marginTop: pixel(15),
        flexDirection: 'row',
    },
});
