import { Dimensions } from 'react-native';
import {
    moderateScale as ms,
    moderateVerticalScale as mvs,
    scale as s,
    verticalScale as vs,
} from '../helpers/scalingUtil';
import { Colors } from '../types/index';

const colors: Colors = {
    white: '#FFFFFF',
    black: '#000000',
    gray: '#888888',
    // design system
    primaryColor: '#FBBF24',
    secondaryColor: '#FEF3C7',
    tertiaryColor: '#F4F4F5',

    primaryGray: '#A4A4A4',
    secondaryGray: '#E4E4E7',
    primaryGrayLabel: '#71717A',
    tertiaryLabel: '#27272A',

    secondaryBackground: '#FFFBEB',
    secondaryOutline: '#F59E0B',
    secondaryLabel: '#78350F',

    error: '#DC2626',
    errorLabel: '#7F1D1D',
    errorBackground: '#FEE2E2',
    disabledColor: '#CFCFCF',
    gray600: '#52525B',
    gray400: '#A1A1AA',
    gray300: '#E8E8E8',
    dividerColor: '#D4D4D8',

    approved: '#65A30D',
    green700: '#15803D',
    pending: '#FCD34D',
};

const fontSize = {
    fs10: ms(10),
    fs12: ms(12),
    fs14: ms(14),
    fs16: ms(16),
    fs18: ms(18),
    fs20: ms(20),
    fs22: ms(22),
    fs24: ms(24),
    fs28: ms(28),
    fs32: ms(32),
    fs40: ms(40),
};

const lineHeight = {
    lh16: vs(16),
    lh18: vs(18),
    lh20: vs(20),
    lh22: vs(22),
    lh24: vs(24),
    lh32: vs(32),
    lh36: vs(36),
    lh40: vs(40),
    lh46: vs(46),
    lh50: vs(50),
    lh54: vs(54),
    lh58: vs(58),
    lh64: vs(64),
};

const scale = {
    sc1: ms(1),
    sc2: ms(2),
    sc4: ms(4),
    sc5: ms(5),
    sc6: ms(6),
    sc8: ms(8),
    sc10: ms(10),
    sc12: ms(12),
    sc15: ms(15),
    sc16: ms(16),
    sc18: ms(18),
    sc20: ms(20),
    sc24: ms(24),
    sc32: ms(32),
    sc28: ms(28),
    sc40: ms(40),
    sc46: ms(46),
    sc48: ms(48),
    sc50: ms(50),
    sc64: ms(64),
    sc62: ms(62),
    sc80: ms(80),
    sc96: ms(96),
    sc112: ms(112),
    sc140: ms(140),
    sc160: ms(160),
    sc220: ms(220),
    vsc1: vs(1),
    vsc2: vs(2),
    vsc4: vs(4),
    vsc6: vs(6),
    vsc8: vs(8),
    vsc10: vs(10),
    vsc12: vs(12),
    vsc16: vs(16),
    vsc20: vs(20),
    vsc22: vs(22),
    vsc24: vs(24),
    vsc26: vs(26),
    vsc28: vs(28),
    vsc32: vs(32),
    vsc40: vs(40),
    vsc48: vs(48),
    vsc50: vs(50),
    vsc54: vs(54),
    vsc56: vs(56),
    vsc64: vs(64),
    vsc68: vs(68),
    vsc80: vs(80),
    vsc96: vs(96),
    vsc110: vs(110),
    vsc130: vs(130),
    vsc150: vs(150),
};

const radius = {
    rd4: s(4),
    rd6: s(6),
    rd8: s(8),
    rd12: s(12),
    rd14: s(14),
    rd24: s(24),
    rd36: s(36),
    rd64: s(64),
    rd50: s(50),
};

const deviceDimensions = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
};

const fontFamily = {
    poppins100: 'Poppins-Thin',
    poppins200: 'Poppins-ExtraLight',
    poppins300: 'Poppins-Light',
    poppins400: 'Poppins-Regular',
    poppins500: 'Poppins-Medium',
    poppins600: 'Poppins-SemiBold',
    poppins700: 'Poppins-Bold',
    poppins800: 'Poppins-ExtraBold',
    poppins900: 'Poppins-Black',
};

export default {
    colors,
    fontSize,
    lineHeight,
    scale,
    radius,
    fontFamily,
    deviceDimensions,
    ms,
    mvs,
    s,
    vs,
};
