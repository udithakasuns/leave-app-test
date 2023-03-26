import {
    TID_LEAVE_STATUS_TYPE,
    TID_LEAVE_STATUS_DATE,
    TID_LEAVE_STATUS_DURATION,
    TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE,
    TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON,
    TID_APPROVED_LEAVE_SHEET_BUTTON_REVOKE_LEAVE,
    TID_REVOKE_LEAVE_SHEET_TXT_REVOKE_REASON,
    TID_REVOKE_LEAVE_SHEET_BUTTON_REQUEST_REVOKE_LEAVE,
    TID_EMPLOYEE_LEAVE_REQUEST_LIST,
    TID_EMPLOYEE_LEAVE_REQUEST_ROW,
    TID_EMPLOYEE_LEAVE_REQUEST_DATE,
    TID_EMPLOYEE_LEAVE_REQUEST_TYPE,
    TID_EMPLOYEE_LEAVE_REQUEST_STATUS,
    TID_MANAGER_LEAVE_REQUEST_ROW,
    TID_MANAGER_LEAVE_REQUEST_STATUS,
    TID_MANAGER_LEAVE_REQUEST_DATE,
    TID_APPROVAL_SHEET_BODY_BUTTON_APPROVE_LEAVE,
    TID_APPROVAL_SHEET_BODY_BUTTON_DECLINE_LEAVE,
} from 'src/utils/testIds';

import { LeaveDuration, HalfDayLeaveType } from '../helpers/constants';

// Home page Locators
export const drpdownRoleSwitcher: Detox.NativeMatcher = by.id(
    'drpdownRoleSwitcher',
);

export const lblRoleSwitcher: Detox.NativeMatcher = by.text('Change your role');

export const btnEmployeeViewSwitch: Detox.NativeMatcher =
    by.text('Employee View');

export const btnManagerViewSwitch: Detox.NativeMatcher =
    by.text('Manager View');

export const btnSwitchToManger: Detox.NativeMatcher = by.id(
    'drpdownRoleEmployee',
);

export const lblInvalidUser: Detox.NativeMatcher = by.text('Invalid User');

export const btnProceed: Detox.NativeMatcher = by.text('Proceed');

export const lblGreeting: Detox.NativeMatcher = by.id('txtGreetingHome');

export const btnAvatar: Detox.NativeMatcher = by.id('test:id/USER_PROFILE_PIC');

export const btnLogout: Detox.NativeMatcher = by.text('Logout');

export const btnApplyLeave: Detox.NativeMatcher = by.text('Apply Leave');

export const btnConfirmLeave: Detox.NativeMatcher =
    by.text('Confirm and Apply');

export const btnCancel: Detox.NativeMatcher = by.text('Cancel');

export const btnSelectLeaveDate: Detox.NativeMatcher = by.text(
    'Select the leave date',
);

export const btnConfirmDate: Detox.NativeMatcher = by.text('Confirm Date');

export const getSelectLeaveTypeTestID: (type: string) => Detox.NativeMatcher = (
    type: string,
) => by.id(`ApplyLeaveSheet_LeaveEntitlementCard_${type}`);

export const getSelectLeaveDateTestID: (date: string) => Detox.NativeMatcher = (
    date: string,
) => by.id(`ChooseDateSheetBody_calendar.day_${date}`);

export const getSelectLeaveDurationLocator: (
    duration: LeaveDuration,
) => Detox.NativeMatcher = (duration: LeaveDuration) => {
    switch (duration) {
        case LeaveDuration.FULL_DAY:
            return by.text('Full Day');
        case LeaveDuration.HALF_DAY:
            return by.text('Half Day');
        default:
            return by.text('Full Day');
    }
};

export const getSelectHalfDayLeaveTypeLocator: (
    leaveType: HalfDayLeaveType,
) => Detox.NativeMatcher = (leaveType: HalfDayLeaveType) => {
    switch (leaveType) {
        case HalfDayLeaveType.MORNING:
            return by.text('Morning');
        case HalfDayLeaveType.EVENING:
            return by.text('Evening');
        default:
            return by.text('Morning');
    }
};

export const lblConfirmHeader: Detox.NativeMatcher = by.text(
    'Leave Request Confirmed',
);

export const btnProceedToHome: Detox.NativeMatcher = by.text('Proceed to home');

export const btnUndoRequest: Detox.NativeMatcher = by.text('Undo request');

// Leave Requests List Locators in Employee Home

export const leaveRequestList: Detox.NativeMatcher = by.id(
    TID_EMPLOYEE_LEAVE_REQUEST_LIST,
);

export const listItemLeaveRequests: Detox.NativeMatcher = by.id(
    TID_EMPLOYEE_LEAVE_REQUEST_ROW,
);

export const getLeaveRequestDateByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_EMPLOYEE_LEAVE_REQUEST_DATE}_${index.toString()}`);

export const getLeaveRequestTypeByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_EMPLOYEE_LEAVE_REQUEST_TYPE}_${index.toString()}`);

export const getLeaveRequestStatusIndicatorByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_EMPLOYEE_LEAVE_REQUEST_STATUS}_${index.toString()}`);

export const lblPendingLeaveStatus: Detox.NativeMatcher = by.text(
    'Pending leave status',
);

export const btnCancelLeave: Detox.NativeMatcher = by.text('Cancel Leave');

export const lblCancelLeave: Detox.NativeMatcher = by.text(
    'Cancel requested leave',
);

// Leave Requests List Locators in Manager Home

export const listItemManagerLeaveRequests: Detox.NativeMatcher = by.id(
    `${TID_MANAGER_LEAVE_REQUEST_ROW}`,
);

export const getManagerLeaveRequesterNameByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_MANAGER_LEAVE_REQUEST_ROW}_${index.toString()}`);

export const getManagerLeaveRequestStatusByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_MANAGER_LEAVE_REQUEST_STATUS}_${index.toString()}`);

export const getManagerLeaveRequestDateByIndex: (
    index: number,
) => Detox.NativeMatcher = (index: number) =>
    by.id(`${TID_MANAGER_LEAVE_REQUEST_DATE}_${index.toString()}`);

// Approve Leave Modal

export const btnApproveLeaveModal: Detox.NativeMatcher = by.id(
    `${TID_APPROVAL_SHEET_BODY_BUTTON_APPROVE_LEAVE}`,
);

export const btnDeclineLeaveModal: Detox.NativeMatcher = by.id(
    `${TID_APPROVAL_SHEET_BODY_BUTTON_DECLINE_LEAVE}`,
);

export const lblLeaveTypeModal: Detox.NativeMatcher = by.id(
    `${TID_LEAVE_STATUS_TYPE}`,
);

export const lblLeaveDateModal: Detox.NativeMatcher = by.id(
    `${TID_LEAVE_STATUS_DATE}`,
);

export const lblLeaveDurationModal: Detox.NativeMatcher = by.id(
    `${TID_LEAVE_STATUS_DURATION}`,
);

export const lblLeaveRequestApproved: Detox.NativeMatcher = by.text(
    'Leave request approved',
);

export const btnUndoApproval: Detox.NativeMatcher = by.text('Undo approval');

// Decline Leave Modal

export const btnConfirmDeclineLeave: Detox.NativeMatcher = by.id(
    `${TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE}`,
);

export const txtDeclineLeaveReason: Detox.NativeMatcher = by.id(
    `${TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON}`,
);

export const lblLeaveRequestDeclined: Detox.NativeMatcher = by.text(
    'Leave request denied',
);

// Approved Leave Modal

export const btnRevokeApproval: Detox.NativeMatcher = by.id(
    `${TID_APPROVED_LEAVE_SHEET_BUTTON_REVOKE_LEAVE}`,
);

export const txtRevokeReason: Detox.NativeMatcher = by.id(
    `${TID_REVOKE_LEAVE_SHEET_TXT_REVOKE_REASON}`,
);

export const btnRequestRevoke: Detox.NativeMatcher = by.id(
    `${TID_REVOKE_LEAVE_SHEET_BUTTON_REQUEST_REVOKE_LEAVE}`,
);

export const lblLeaveRevoked: Detox.NativeMatcher = by.text('Leave revoked');
