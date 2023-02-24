import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

const MINERS_MARGIN = -scale.sc6;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    emtyContainer: {
        flex: 1,
    },
    availableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: scale.sc20,
    },
    availableChip: {
        marginLeft: scale.sc4,
        paddingVertical: scale.sc2,
        paddingHorizontal: 0,
        alignSelf: 'flex-end',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    avatar: {
        marginLeft: MINERS_MARGIN,
        borderColor: colors.white,
        borderWidth: 1,
    },
    avatarWithLeftSpace: {
        marginLeft: MINERS_MARGIN,
        borderColor: colors.white,
        borderWidth: 1,
    },
    awayChip: {
        paddingVertical: scale.sc2,
        paddingHorizontal: 0,
        alignSelf: 'flex-end',
        marginLeft: MINERS_MARGIN,
    },
    plusIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: scale.sc36,
        width: scale.sc36,
        borderRadius: scale.sc36 / 2,
        marginLeft: MINERS_MARGIN,
        backgroundColor: colors.gray200,
        borderColor: colors.white,
        borderWidth: 1,
    },
});
