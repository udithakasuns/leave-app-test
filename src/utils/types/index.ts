export type Colors = {
    white: string;
    black: string;
    gray: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    primaryGray: string;
    primaryGrayLabel: string;
    secondaryOutline: string;
    secondaryLabel: string;
    error: string;
    errorBackground: string;
    disabledColor: string;
    errorLabel: string;
    secondaryGray: string;
    tertiaryLabel: string;
    secondaryBackground: string;
    tertiaryLabelGray: string;
    dividerColor: string;
};

// Custom Utility type to set attributes required.
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Custom Utility type to set attributes nullable.
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type TestProps = {
    testId: string;
    testIdcontainer: string;
    testIdInputContainer: string;
    testIdLabel: string;
    testIdInput: string;
    testIdLeftIcon: string;
    testIdRightIcon: string;
    testIdCaption: string;
    testIdLoading: string;
};
