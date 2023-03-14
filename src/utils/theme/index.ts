import { Dimensions } from 'react-native';
import { font, pixel, height } from '../helpers/scalingUtil';
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
    red50: '#FEF2F2',
    red500: '#EF4444',
    red800: '#991B1B',
    red900: '#FECACA',
    disabledColor: '#CFCFCF',
    gray600: '#52525B',
    gray700: '#3F3F46',
    gray400: '#A1A1AA',
    gray300: '#E8E8E8',
    grey600: '#868686',
    gray200: '#FAFAFA',
    dividerColor: '#D4D4D8',

    approved: '#65A30D',
    green200: '#62B774',
    green700: '#15803D',
    green800: '#166534',
    lime50: '#F7FEE7',
    lime200: '#D9F99D',
    lime600: '#ECFCCB',
    lime800: '#3F6212',
    pending: '#FCD34D',
    yellow300: '#EEA92E',
    amber50: '#FFFBEB',

    iconLabel: '#D97706',
};

const fontSize = {
    fs10: font(10),
    fs12: font(12),
    fs14: font(14),
    fs16: font(16),
    fs18: font(18),
    fs20: font(20),
    fs22: font(22),
    fs24: font(24),
    fs28: font(28),
    fs32: font(32),
    fs40: font(40),
};

const lineHeight = {
    lh16: pixel(16),
    lh18: pixel(18),
    lh20: pixel(20),
    lh22: pixel(22),
    lh24: pixel(24),
    lh32: pixel(32),
    lh36: pixel(36),
    lh40: pixel(40),
    lh46: pixel(46),
    lh50: pixel(50),
    lh54: pixel(54),
    lh58: pixel(58),
    lh64: pixel(64),
};

const scale = {
    sc1: pixel(1 * 1.12),
    sc2: pixel(2 * 1.12),
    sc4: pixel(4 * 1.12),
    sc5: pixel(5 * 1.12),
    sc6: pixel(6 * 1.12),
    sc8: pixel(8 * 1.12),
    sc10: pixel(10 * 1.12),
    sc12: pixel(12 * 1.12),
    sc15: pixel(15 * 1.12),
    sc16: pixel(16 * 1.12),
    sc18: pixel(18 * 1.12),
    sc20: pixel(20 * 1.12),
    sc24: pixel(24 * 1.12),
    sc28: pixel(28 * 1.12),
    sc32: pixel(32 * 1.12),
    sc36: pixel(36 * 1.12),
    sc40: pixel(40 * 1.12),
    sc46: pixel(46 * 1.12),
    sc48: pixel(48 * 1.12),
    sc50: pixel(50 * 1.12),
    sc64: pixel(64 * 1.12),
    sc62: pixel(62 * 1.12),
    sc70: pixel(70 * 1.12),
    sc80: pixel(80 * 1.12),
    sc96: pixel(96 * 1.12),
    sc112: pixel(112 * 1.12),
    sc140: pixel(140 * 1.12),
    sc160: pixel(160 * 1.12),
    sc220: pixel(220 * 3.12),
    vsc1: pixel(1 * 1.12),
    vsc2: pixel(2 * 1.12),
    vsc4: pixel(4 * 1.12),
    vsc6: pixel(6 * 1.12),
    vsc8: pixel(8 * 1.12),
    vsc10: pixel(10 * 1.12),
    vsc12: pixel(12 * 1.12),
    vsc16: pixel(16 * 1.12),
    vsc20: pixel(20 * 1.12),
    vsc22: pixel(22 * 1.12),
    vsc24: pixel(24 * 1.12),
    vsc26: pixel(26 * 1.12),
    vsc28: pixel(28 * 1.12),
    vsc32: pixel(32 * 1.12),
    vsc40: pixel(40 * 1.12),
    vsc48: pixel(48 * 1.12),
    vsc50: pixel(50 * 1.12),
    vsc54: pixel(54 * 1.12),
    vsc56: pixel(56 * 1.12),
    vsc64: pixel(64 * 1.12),
    vsc68: pixel(68 * 1.12),
    vsc80: pixel(80 * 1.12),
    vsc96: pixel(96 * 1.12),
    vsc110: pixel(110 * 1.12),
    vsc120: pixel(120 * 1.12),
    vsc150: pixel(150 * 1.12),
};

const radius = {
    rd4: pixel(4),
    rd6: pixel(6),
    rd8: pixel(8),
    rd12: pixel(12),
    rd14: pixel(14),
    rd24: pixel(24),
    rd36: pixel(36),
    rd64: pixel(64),
    rd50: pixel(50),
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
    pixel,
    height,
};
