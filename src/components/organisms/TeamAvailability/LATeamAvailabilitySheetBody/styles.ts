import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, fontSize, fontFamily, pixel } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.tertiaryColor,
        borderRadius: scale.sc8,
        padding: scale.sc12,
        marginBottom: scale.sc12,
    },
    listItemLeftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale.sc36,
        height: scale.sc36,
        borderRadius: scale.sc36 / 2,
        backgroundColor: colors.secondaryOutline,
    },
    listItemRightContainerText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.lime200,
        borderColor: colors.lime800,
        borderWidth: 1,
        borderRadius: scale.sc36,
        padding: scale.sc4,
    },
    listItemRightContainer: {
        flex: 4,
        flexDirection: 'row',
        marginLeft: pixel(23),
    },
    rangeListContainer: {
        backgroundColor: colors.tertiaryColor,
        padding: scale.sc12,
        borderRadius: scale.sc64,
        marginRight: scale.sc4,
    },
    textStyle: {
        color: colors.white,
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.poppins400,
    },
    avatarStyle: {
        marginLeft: pixel(-15),
        borderColor: colors.white,
        borderWidth: 1,
    },
    expandAvatarStyle: {
        paddingVertical: scale.sc1,
        backgroundColor: colors.white,
        marginRight: scale.sc6,
        maxWidth: pixel(121),
        minWidth: pixel(140),
    },
});
