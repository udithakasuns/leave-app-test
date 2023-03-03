import { Platform, StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, fontSize, pixel } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    subLeftTitleTextStyle: {
        flex: 1,
        textAlign: 'center',
        marginLeft: -scale.sc6,
        fontSize: fontSize.fs12,
    },
    subRightTitleTextStyle: {
        flex: 4,
        fontSize: fontSize.fs12,
        marginLeft: scale.sc6,
    },
    listContentStyle: {
        minHeight: Platform.OS === 'ios' ? pixel(410) : pixel(420),
        justifyContent: 'flex-start',
        marginBottom: scale.sc4,
    },
    rangeListContainer: {
        backgroundColor: colors.tertiaryColor,
        paddingVertical: scale.sc12,
        paddingHorizontal: scale.sc16,
        borderRadius: scale.sc64,
        marginRight: scale.sc4,
    },
});
