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
    gray700: string;
    gray600: string;
    gray300: string;
    tertiaryLabel: string;
    secondaryBackground: string;
    dividerColor: string;
    approved: string;
    pending: string;
    green700: string;
    gray400: string;
    red900: string;
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

export type IconLibrary = 'material' | 'community' | 'svg';

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

export type EntitlementSelection = Entitlement & {
    isSelected: boolean;
};

export enum Status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
    CANCELLED = 'CANCELLED',
}

export type StatusType = keyof typeof Status;

export enum States {
    FULLDAY = 'FULLDAY',
    HALFDAY_MORNING = 'HALFDAY_MORNING',
    HALFDAY_EVENING = 'HALFDAY_EVENING',
}

export type LeaveSate = keyof typeof States;

export type EmployeeType = {
    employeeId: string;
    name: string | null;
    designation: string | null;
    authPic: string | null;
};

export type LeaveRequestType = {
    leaveRequestId: number;
    startDate: string;
    endDate: string;
    leaveType: LeaveType;
    reasonForLeave: string | null;
    leaveState: string;
    status: StatusType;
    requestDesc?: string | null;
    reviewerComment?: string | null;
    employee: EmployeeType;
};

export type RequestDetails = {
    leaveRequest?: AtLeast<LeaveRequestType, 'leaveType'>;
    durationDays: string;
    recipient?: EmployeeType[];
};

export interface Section {
    title: string;
    data: LeaveRequestType[];
}

type RequestParams = {
    sortKey: 'creationDate' | 'startDate';
    page: number;
    size: number;
    status: string;
    startDate: string;
    endDate: string;
    leaveType: string;
};

export type LeaveRequestParams = Partial<RequestParams>;

export type FilterTypes = {
    name: string;
    typeId: number;
};

export enum EmployeeModal {
    'APPLY_LEAVE_MODAL',
    'CHOSE_DATE_MODAL',
    'PENDING_LEAVE_MODAL',
    'DENIED_LEAVE_MODAL',
    'APPROVED_LEAVE_MODAL',
    'REVOKE_REQUEST_MODAL',
    'CANCEL_REQUEST_MODAL',
    'LEAVE_INFORMATION',
}

export enum EmployeePopup {
    'LEAVE_REQUEST_CONFIRMATION',
    'LEAVE_REQUEST_REVOKE',
}

export type ApplyFormValues = {
    typeId: number;
    leaveState?: LeaveSate;
    requestDesc: string;
    startDate: string;
    endDate: string;
    entitlements: EntitlementSelection[];
};
