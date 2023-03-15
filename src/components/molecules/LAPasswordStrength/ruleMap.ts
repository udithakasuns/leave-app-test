import theme from 'src/utils/theme';
import { RuleMap } from './types';

const { colors } = theme;

export const ruleMap: RuleMap = {
    0: {
        color: colors.black,
        fillStrokes: 0,
        strokeText: 'Weak',
    },
    1: {
        color: colors.error,
        fillStrokes: 1,
        strokeText: 'Weak',
    },
    2: {
        color: colors.primaryColor,
        fillStrokes: 2,
        strokeText: 'Decent',
    },
    3: {
        color: colors.primaryColor,
        fillStrokes: 2,
        strokeText: 'Decent',
    },
    4: {
        color: colors.approved,
        fillStrokes: 3,
        strokeText: 'Good',
    },
    5: {
        color: colors.green800,
        fillStrokes: 4,
        strokeText: 'Great',
    },
};
