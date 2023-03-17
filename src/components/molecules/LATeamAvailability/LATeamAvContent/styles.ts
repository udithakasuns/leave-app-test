import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

const MINERS_MARGIN = -scale.sc8;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale.sc10,
    },
    availableChip: {
        marginLeft: scale.sc4,
        paddingVertical: scale.sc2,
        paddingHorizontal: 0,
        alignSelf: 'center',
    },
    avatarContainer: {
        flexDirection: 'row',
    },
    avatar: {
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
        marginLeft: MINERS_MARGIN + scale.sc2,
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
