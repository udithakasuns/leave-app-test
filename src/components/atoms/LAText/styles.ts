import { StyleSheet } from 'react-native';
import theme from '../../../utils/theme';

const { fontSize, fontFamily } = theme;

export const styles = StyleSheet.create({
    H1: {
        fontSize: fontSize.fs24,
        fontFamily: fontFamily.poppins400,
    },
    H1Bold: {
        fontSize: fontSize.fs24,
        fontFamily: fontFamily.poppins700,
    },
    H2: {
        fontSize: fontSize.fs20,
        fontFamily: fontFamily.poppins400,
    },
    H2Bold: {
        fontSize: fontSize.fs20,
        fontFamily: fontFamily.poppins700,
    },
    SubH: {
        fontSize: fontSize.fs18,
        fontFamily: fontFamily.poppins400,
    },
    SubHBold: {
        fontSize: fontSize.fs18,
        fontFamily: fontFamily.poppins700,
    },
    ParaLG: {
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.poppins400,
    },
    ParaLGBold: {
        fontSize: fontSize.fs16,
        fontFamily: fontFamily.poppins700,
    },
    ParaSM: {
        fontSize: fontSize.fs14,
        fontFamily: fontFamily.poppins400,
    },
    ParaSMBold: {
        fontSize: fontSize.fs14,
        fontFamily: fontFamily.poppins700,
    },
    ParaXS: {
        fontSize: fontSize.fs12,
        fontFamily: fontFamily.poppins400,
    },
    ParaXSBold: {
        fontSize: fontSize.fs12,
        fontFamily: fontFamily.poppins700,
    },
});
