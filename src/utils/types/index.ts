import { MultiButtonProps, MultiChipProps } from 'src/components/molecules';

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
    green200: string;
    gray400: string;
    red900: string;
    red500: string;
    red50: string;
    lime50: string;
    grey600: string;
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

export enum FilterDates {
    ANY = 'ANY_DAY',
    TODAY = 'TODAY',
    WEEK = 'THIS_WEEK',
    MONTH = 'THIS_MONTH',
}

export type FilterDatesType = keyof typeof FilterDates;

export type EmployeeType = {
    employeeId: string;
    name: string | null;
    designation: string | null;
    authPic: string | null;
};

export type UserRole = 'employee' | 'manager';

export type UserType = {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    designation: string;
    role: UserRole;
};

export type LeaveRequestType = {
    leaveRequestId: number;
    startDate: string;
    endDate: string;
    leaveType: LeaveType;
    // reasonForLeave: string | null;
    leaveState: string;
    status: StatusType;
    // requestDesc?: string | null;
    // reviewerComment?: string | null;
    durationHours: number | null;
    durationDays: number | null;
};

export type LeaveRequestWithPageType = {
    leaveRequestData: Section<LeaveRequestType[]>[];
    pageNumbers: number;
};

export interface LeaveRequestByID extends LeaveRequestType {
    reviewerComment: string;
    requestDesc: string;
    creationDate: string;
    reviewedDate: string;
    employee: EmployeeType;
    reviewer: EmployeeType;
}

export type PendingRequestType = {
    leaveRequestId: number;
    startDate: string;
    endDate: string;
    leaveType: LeaveType;
    status: StatusType;
    leaveState: LeaveSate;
    durationHours: number;
    durationDays: number;
    employee: EmployeeType;
};

export interface PendingRequestByID extends PendingRequestType {
    reviewerComment: string;
    requestDesc: string;
    creationDate: string;
    reviewedDate: string;
    reviewer: EmployeeType;
}

export type UpdateManagerRequest = {
    requestID: number;
    status: StatusType;
    reviewerComment: string;
};

export type RequestDetails = {
    leaveRequest?: AtLeast<LeaveRequestByID, 'leaveType'>;
    recipient?: EmployeeType[];
};

export interface Section<T> {
    title: string;
    isViewAllVisible: boolean;
    data: T;
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
    'CANCELLED_LEAVE_MODAL',
    'LEAVE_INFORMATION',
}

export enum EmployeePopup {
    'LEAVE_REQUEST_CONFIRMATION',
    'LEAVE_REQUEST_REVOKE',
    'LEAVE_REQUEST_CANCELLED',
}

export enum ManagerModal {
    'PENDING_LEAVE_MODAL',
    'DECLINE_LEAVE_MODAL',
    'APPROVED_LEAVE_MODAL',
    'CANCELLED_LEAVE_MODAL',
    'DENIED_LEAVE_MODAL',
    'LEAVE_INFORMATION',
}

export enum ManagerPopup {
    'LEAVE_REQUEST_APPROVED',
    'LEAVE_REQUEST_DECLINE',
}

export type ApplyFormValues = {
    typeId: number;
    selectedLeaveBalance?: number;
    leaveState?: LeaveSate;
    requestDesc: string;
    startDate: string;
    endDate: string;
    entitlements: EntitlementSelection[];
};

export type LeaveUndoProp = {
    requestID: number;
    startDate: string;
    endDate: string;
    requestDesc: string;
    leaveRequestStatus: StatusType;
};

export type FilterChipsProps = {
    id: number;
    title: string;
    chips: MultiChipProps[];
    singleSelection?: boolean;
};

export type FilterProps = {
    sortByButtons: MultiButtonProps[];
    filterChips: FilterChipsProps[];
    onSortPress: (multiButtons: MultiButtonProps[]) => void;
    onFilterPress: (multiButtons: FilterChipsProps[]) => void;
};
