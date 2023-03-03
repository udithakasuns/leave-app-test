import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, fontSize, fontFamily } = theme;

const MINERS_MARGIN = -scale.sc6;

export const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.tertiaryColor,
        borderRadius: scale.sc8,
        padding: scale.sc12,
        marginBottom: scale.sc4,
        maxHeight: scale.sc64,
    },
    listItemLeftContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    listItemRightContainerText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.lime600,
        borderColor: colors.approved,
        borderWidth: 1,
        borderRadius: scale.sc36,
        padding: scale.sc4,
    },
    listItemRightContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: -scale.sc16,
    },
    listItemDateContainer: {
        width: scale.sc36,
        height: scale.sc36,
        borderRadius: scale.sc36 / 2,
        backgroundColor: colors.secondaryOutline,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemDateStyle: {
        color: colors.white,
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.poppins400,
    },
    avatar: {
        borderColor: colors.white,
        borderWidth: 1,
    },
    avatarWithLeftSpace: {
        marginLeft: -scale.sc8,
        borderColor: colors.white,
        borderWidth: 1,
    },
    listItemExpandAvatarStyle: {
        paddingVertical: scale.sc1,
        paddingHorizontal: scale.sc1,
        backgroundColor: colors.white,
        marginRight: scale.sc6,
        borderRadius: scale.sc64,
    },
    listItemPlusIcon: {
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
