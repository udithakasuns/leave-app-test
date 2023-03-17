export type RuleKey =
    | 'LOWER_CASE'
    | 'UPPER_CASE'
    | 'ONE_NUMBER'
    | 'EIGHT_CHARACTER'
    | 'SPECEAL_CHARACTER';

export interface Rule {
    key: RuleKey;
    text: string;
    isMatched: boolean;
    color: string;
}

export type RuleKeyMap = {
    [key in RuleKey]: boolean;
};

type StrokeText = 'Weak' | 'Decent' | 'Good' | 'Great';

export type RuleMap = {
    [key in number]: {
        color: string;
        fillStrokes: number;
        strokeText: StrokeText;
    };
};
