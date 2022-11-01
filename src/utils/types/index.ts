export type Colors = {
    white: string;
    black: string;
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    primaryGray: string;
    primaryGrayLabel: string;
    secondaryOutline: string;
    secondaryLabel: string;
    error: string;
    errorBackground: string;
    errorLabel: string;
    secondaryGray: string;
    tertiaryLabel: string;
};

// Custom Utility type to set attributes required.
export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type TestProps = {
    testID: string;
    testLoadingID: string;
};
