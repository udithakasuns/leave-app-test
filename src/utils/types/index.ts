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
    green800: string;
    gray400: string;
    gray200: string;
    red900: string;
    red500: string;
    red800: string;
    red50: string;
    lime50: string;
    lime200: string;
    lime600: string;
    lime800: string;
    grey600: string;
    iconLabel: string;
    yellow300: string;
    amber50: string;
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
    REVOKED = 'REVOKED',
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

export type LeaveState = 'HALFDAY_MORNING' | 'HALFDAY_EVENING' | 'FULLDAY';

export type LeaveRequestType = {
    leaveRequestId: number;
    startDate: string;
    endDate: string;
    leaveType: LeaveType;
    // reasonForLeave: string | null;
    leaveState: LeaveState;
    status: StatusType | '';
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
    status: StatusType | '';
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
    previousStatus?: StatusType;
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

export interface Page<T> {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: T;
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
    'REVOKE_LEAVE_MODAL',
}

export enum ManagerPopup {
    'LEAVE_REQUEST_APPROVED',
    'LEAVE_REQUEST_DECLINE',
    'LEAVE_REQUEST_REVOKE',
    'LEAVE_REQUEST_REVOKE_UNDO',
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

export type DeviceType = 'ANDROID' | 'IOS';

export type NotificationType =
    | 'NEW_LEAVE_REQUEST'
    | 'LEAVE_REQUEST_NUDGE'
    | 'LEAVE_REQUEST_APPROVED_DENIED'
    | 'LEAVE_REQUEST_CANCELLED'
    | 'MULTI_DAY_LEAVE_REQUEST_NUDGE'
    | 'NEW_MULTI_DAY_LEAVE_REQUEST';

export type NotificationBody = {
    image: string;
    message: string;
};

export type NotificationPayload = {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: {
        id: number;
        createdDate: string;
        title: string;
        body: NotificationBody;
        notificationType: NotificationType;
        resourceId: number;
        viewed: boolean;
    }[];
};

export type NotificationVisibleType = 'all' | 'unread';
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

export type ManagerNotificationSettings = {
    isNudgeNotificationsEnabled: boolean;
    isLeaveRequestNotificationsEnabled: boolean;
    isUpcomingEventsNotificationsEnabled: boolean;
};

export type EmployeeNotificationSettings = {
    isLeaveRequestNotificationsEnabled: boolean;
    isUpcomingEventsNotificationsEnabled: boolean;
};

export type NotificationSettings = {
    manager: ManagerNotificationSettings;
    employee: EmployeeNotificationSettings;
};

export type Settings = {
    notifications: NotificationSettings;
};

export type Me = {
    userId: number;
    username: string;
    email: string;
    settings: Settings;
    active: boolean;
};

export type Team = {
    teamId: number;
    teamName: string;
};

export interface SelectedTeam extends Team {
    recentlySelected: boolean;
}
export interface AwayTeamByDate {
    date: string;
    employeeResponseDtos: EmployeeType[];
}
export type AvailableTeam = {
    onLeaveCount: number;
    onlineCount: number;
    imageList: string[];
    nameList: string[];
};
export interface EmployeeOnLeaveByDay {
    employeeOnLeaveByDayResponseDtoList: AwayTeamByDate[];
    adminEmployeesOnLeaveByTeamDto: AvailableTeam;
}

export interface Holiday {
    id: number;
    date: string;
    reason: string;
    holidayType: string;
    holidayDuration: string;
    holidayColor: string;
}
