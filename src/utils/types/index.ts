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
    gray600: string;
    gray300: string;
    tertiaryLabel: string;
    secondaryBackground: string;
    dividerColor: string;
    approved: string;
    pending: string;
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
    testIdContent: string;
    testIdLoading: string;
    testIdChip: string;
};

export type TextTypeProps =
    | 'H1'
    | 'H1Bold'
    | 'H2'
    | 'H2Bold'
    | 'SubH'
    | 'SubHBold'
    | 'ParaLG'
    | 'ParaLGBold'
    | 'ParaSM'
    | 'ParaSMBold'
    | 'ParaXS'
    | 'ParaXSBold';

export type UserTokenType = 'idToken' | 'accessToken' | 'refreshToken';

export type UserTokens = {
    idToken: string;
    accessToken: string;
    refreshToken: string;
};

export type LeaveType = {
    typeId: number;
    name: string;
};
export interface Entitlement {
    entitlementId: number;
    totalHoursAllocated: number;
    totalHoursUsed: number;
    leaveType: LeaveType;
    validFrom: number;
    validTo: number;
    active: boolean;
    totalDaysAllocated: number;
    totalDaysUsed: number;
    balanceInDays: number;
}

export type StatusType = 'PENDING' | 'APPROVED' | 'DENIED' | 'CANCELLED';

export type EmployeeType = {
    employeeId: string;
    name?: string | null;
    designation?: string | null;
    authPic?: string | null;
};

export type LeaveRequestType = {
    startDate: number;
    endDate: number;
    leaveType: LeaveType;
    reasonForLeave: string | null;
    leaveState: string;
    status: StatusType;
    requestDesc?: string | null;
    reviewerComment?: string | null;
    employee: EmployeeType;
};

export interface Section {
    title: string;
    data: LeaveRequestType[];
}
