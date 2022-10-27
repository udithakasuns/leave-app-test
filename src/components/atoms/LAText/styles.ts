import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

const { colors, fontSize, lineHeight } = theme;

export const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fontFamily.poppins,
        fontStyle: 'normal',
        color: colors.black,
    },
    H1Text: {
        fontSize: fontSize.fs32,
        lineHeight: lineHeight.lh64,
        fontWeight: '700',
    },
    H2Text: {
        fontSize: fontSize.fs28,
        lineHeight: lineHeight.lh40,
        fontWeight: '700',
    },
    H3Text: {
        fontSize: fontSize.fs24,
        lineHeight: lineHeight.lh32,
        fontWeight: '700',
    },
    H4Text: {
        fontSize: fontSize.fs20,
        lineHeight: lineHeight.lh24,
        fontWeight: '700',
    },
    H5Text: {
        fontSize: fontSize.fs16,
        lineHeight: lineHeight.lh20,
        fontWeight: '700',
    },
    H6Text: {
        fontSize: fontSize.fs14,
        lineHeight: lineHeight.lh18,
        fontWeight: '600',
    },
    body1Text: {
        fontSize: fontSize.fs16,
        lineHeight: lineHeight.lh22,
        fontWeight: '400',
    },
    body2Text: {
        fontSize: fontSize.fs14,
        lineHeight: lineHeight.lh18,
        fontWeight: '400',
    },
    body3Text: {
        fontSize: fontSize.fs12,
        lineHeight: lineHeight.lh18,
        fontWeight: '700',
    },
});
