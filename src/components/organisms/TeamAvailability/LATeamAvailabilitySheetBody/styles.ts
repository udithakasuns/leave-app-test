import { StyleSheet } from 'react-native';
import { font } from 'src/utils/helpers/scalingUtil';
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
    listItemRightContainer: {
        flexDirection: 'row',
        marginLeft: pixel(23),
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
});
