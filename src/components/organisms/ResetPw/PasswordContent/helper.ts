import {
    LAPasswordStrengthRuleKey as RuleKey,
    LAPasswordStrengthRule as Rule,
} from 'src/components/molecules';
import theme from 'src/utils/theme';

const { colors } = theme;

export interface Errors {
    codeError: string;
    pwError: string;
    cPwError: string;
}

type ErrorMap = {
    [key in RuleKey]: string;
};

export const defaultRules: Rule[] = [
    {
        key: 'LOWER_CASE',
        text: 'Lower case character',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'UPPER_CASE',
        text: 'Upper case character',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'ONE_NUMBER',
        text: 'One number',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'EIGHT_CHARACTER',
        text: '8 Characters or above',
        isMatched: false,
        color: colors.black,
    },
    {
        key: 'SPECEAL_CHARACTER',
        text: 'One special character (@,$,%)',
        isMatched: false,
        color: colors.black,
    },
];

export const errorMap: ErrorMap = {
    LOWER_CASE: 'New password must contain at least one lowercase character',
    UPPER_CASE: 'New password must contain at least one uppercase character',
    ONE_NUMBER: 'New password must contain at least one number',
    EIGHT_CHARACTER: 'New password must be at least 8 characters long',
    SPECEAL_CHARACTER:
        'New password must contain at least one special character[@,$,%]',
};

export const defaultCodeValues: string[] = ['', '', '', '', '', ''];

export const defaultErrors: Errors = {
    codeError: '',
    pwError: '',
    cPwError: '',
};

export const defaultApiErrorMsg =
    'Something went wrong! Please contact your admin';
