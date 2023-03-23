import { expect as jestExpect } from '@jest/globals';
import {
    TID_LEAVE_STATUS_TYPE,
    TID_LEAVE_STATUS_DATE,
    TID_LEAVE_STATUS_DURATION,
    TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE,
    TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON,
    TID_APPROVED_LEAVE_SHEET_BUTTON_REVOKE_LEAVE,
    TID_REVOKE_LEAVE_SHEET_TXT_REVOKE_REASON,
    TID_REVOKE_LEAVE_SHEET_BUTTON_REQUEST_REVOKE_LEAVE,
} from 'src/utils/testIds';
import { getElementCount } from '../helpers/index';

/* eslint-disable consistent-return */

enum Role {
    EMPLOYEE = 'Employee View',
    MANAGER = 'Manager View',
}

export enum LeaveType {
    CASUAL = 'Casual',
    ANNUAL = 'Annual',
}

export enum LeaveDuration {
    FULL_DAY,
    HALF_DAY,
}

export enum HalfDayLeaveType {
    MORNING = 'Morning',
    EVENING = 'Evening',
}

const TIMEOUT = 30000;

export default class HomeScreen {
    readonly TID: string = 'test:id/';

    // Element Locators
    readonly drpdownRoleSwitcher: Detox.NativeMatcher = by.id(
        'drpdownRoleSwitcher',
    );

    readonly lblRoleSwitcher: Detox.NativeMatcher = by.text('Change your role');

    readonly btnEmployeeViewSwitch: Detox.NativeMatcher =
        by.text('Employee View');

    readonly btnManagerViewSwitch: Detox.NativeMatcher =
        by.text('Manager View');

    readonly btnSwitchToManger: Detox.NativeMatcher = by.id(
        'drpdownRoleEmployee',
    );

    readonly lblInvalidUser: Detox.NativeMatcher = by.text('Invalid User');

    readonly btnProceed: Detox.NativeMatcher = by.text('Proceed');

    readonly lblGreeting: Detox.NativeMatcher = by.id('txtGreetingHome');

    readonly btnAvatar: Detox.NativeMatcher = by.id('test:id/USER_PROFILE_PIC');

    readonly btnLogout: Detox.NativeMatcher = by.text('Logout');

    readonly btnApplyLeave: Detox.NativeMatcher = by.text('Apply Leave');

    readonly btnConfirmLeave: Detox.NativeMatcher =
        by.text('Confirm and Apply');

    readonly btnCancel: Detox.NativeMatcher = by.text('Cancel');

    readonly btnSelectLeaveDate: Detox.NativeMatcher = by.text(
        'Select the leave date',
    );

    readonly btnConfirmDate: Detox.NativeMatcher = by.text('Confirm Date');

    readonly getSelectLeaveTypeTestID: (type: string) => Detox.NativeMatcher = (
        type: string,
    ) => by.id(`ApplyLeaveSheet_LeaveEntitlementCard_${type}`);

    readonly getSelectLeaveDateTestID: (date: string) => Detox.NativeMatcher = (
        date: string,
    ) => by.id(`ChooseDateSheetBody_calendar.day_${date}`);

    readonly getSelectLeaveDurationLocator: (
        duration: LeaveDuration,
    ) => Detox.NativeMatcher = (duration: LeaveDuration) => {
        // eslint-disable-next-line consistent-return
        switch (duration) {
            case LeaveDuration.FULL_DAY:
                return by.text('Full Day');
            case LeaveDuration.HALF_DAY:
                return by.text('Half Day');
            // no default
        }
    };

    readonly getSelectHalfDayLeaveTypeLocator: (
        leaveType: HalfDayLeaveType,
    ) => Detox.NativeMatcher = (leaveType: HalfDayLeaveType) => {
        switch (leaveType) {
            case HalfDayLeaveType.MORNING:
                return by.text('Morning');
            case HalfDayLeaveType.EVENING:
                return by.text('Evening');
            // no default
        }
    };

    readonly lblConfirmHeader: Detox.NativeMatcher = by.text(
        'Leave Request Confirmed',
    );

    readonly btnProceedToHome: Detox.NativeMatcher = by.text('Proceed to home');

    readonly btnUndoRequest: Detox.NativeMatcher = by.text('Undo request');

    // Leave Requests List Locators in Employee Home

    readonly leaveRequestList: Detox.NativeMatcher = by.id(
        `${this.TID}EMPLOYEE_LEAVE_REQUEST_LIST`,
    );

    readonly listItemLeaveRequests: Detox.NativeMatcher = by.id(
        `${this.TID}TID_EMPLOYEE_LEAVE_REQUEST_ROW`,
    );

    readonly getLeaveRequestDateByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(`${this.TID}TID_EMPLOYEE_LEAVE_REQUEST_DATE_${index.toString()}`);

    readonly getLeaveRequestTypeByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(`${this.TID}TID_EMPLOYEE_LEAVE_REQUEST_TYPE_${index.toString()}`);

    readonly getLeaveRequestStatusIndicatorByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(
            `${this.TID}TID_EMPLOYEE_LEAVE_REQUEST_STATUS_${index.toString()}`,
        );

    readonly lblPendingLeaveStatus: Detox.NativeMatcher = by.text(
        'Pending leave status',
    );

    readonly btnCancelLeave: Detox.NativeMatcher = by.text('Cancel Leave');

    readonly lblCancelLeave: Detox.NativeMatcher = by.text(
        'Cancel requested leave',
    );

    // Leave Requests List Locators in Manager Home

    readonly listItemManagerLeaveRequests: Detox.NativeMatcher = by.id(
        `${this.TID}TID_MANAGER_LEAVE_REQUEST_ROW`,
    );

    readonly getManagerLeaveRequesterNameByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(`${this.TID}TID_MANAGER_LEAVE_REQUEST_ROW_${index.toString()}`);

    readonly getManagerLeaveRequestStatusByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(
            `${this.TID}TID_MANAGER_LEAVE_REQUEST_STATUS_${index.toString()}`,
        );

    readonly getManagerLeaveRequestDateByIndex: (
        index: number,
    ) => Detox.NativeMatcher = (index: number) =>
        by.id(`${this.TID}TID_MANAGER_LEAVE_REQUEST_DATE_${index.toString()}`);

    // Approve Leave Modal

    readonly btnApproveLeaveModal: Detox.NativeMatcher = by.id(
        `${this.TID}TID_APPROVAL_SHEET_BODY_BUTTON_APPROVE_LEAVE`,
    );

    readonly btnDeclineLeaveModal: Detox.NativeMatcher = by.id(
        `${this.TID}TID_APPROVAL_SHEET_BODY_BUTTON_DECLINE_LEAVE`,
    );

    readonly lblLeaveTypeModal: Detox.NativeMatcher = by.id(
        `${TID_LEAVE_STATUS_TYPE}`,
    );

    readonly lblLeaveDateModal: Detox.NativeMatcher = by.id(
        `${TID_LEAVE_STATUS_DATE}`,
    );

    readonly lblLeaveDurationModal: Detox.NativeMatcher = by.id(
        `${TID_LEAVE_STATUS_DURATION}`,
    );

    readonly lblLeaveRequestApproved: Detox.NativeMatcher = by.text(
        'Leave request approved',
    );

    readonly btnUndoApproval: Detox.NativeMatcher = by.text('Undo approval');

    // Decline Leave Modal

    readonly btnConfirmDeclineLeave: Detox.NativeMatcher = by.id(
        `${TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE}`,
    );

    readonly txtDeclineLeaveReason: Detox.NativeMatcher = by.id(
        `${TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON}`,
    );

    readonly lblLeaveRequestDeclined: Detox.NativeMatcher = by.text(
        'Leave request denied',
    );

    // Approved Leave Modal

    readonly btnRevokeApproval: Detox.NativeMatcher = by.id(
        `${TID_APPROVED_LEAVE_SHEET_BUTTON_REVOKE_LEAVE}`,
    );

    readonly txtRevokeReason: Detox.NativeMatcher = by.id(
        `${TID_REVOKE_LEAVE_SHEET_TXT_REVOKE_REASON}`,
    );

    readonly btnRequestRevoke: Detox.NativeMatcher = by.id(
        `${TID_REVOKE_LEAVE_SHEET_BUTTON_REQUEST_REVOKE_LEAVE}`,
    );

    readonly lblLeaveRevoked: Detox.NativeMatcher = by.text('Leave revoked');

    // Actions

    verifyDashboardLoaded = async () => {
        await waitFor(element(this.lblGreeting))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    tapProfile = async () => {
        await element(this.btnAvatar).tap();
    };

    logoutUser = async () => {
        await this.tapProfile();
        await element(this.btnLogout).tap();
    };

    tapRoleSwitcher = async () => {
        await element(this.drpdownRoleSwitcher).tap();
        await waitFor(element(this.lblRoleSwitcher))
            .toBeVisible()
            .withTimeout(10000);
    };

    switchRole = async (role: Role) => {
        let locator;
        switch (role) {
            case Role.EMPLOYEE:
                locator = this.btnEmployeeViewSwitch;
                break;
            case Role.MANAGER:
                locator = this.btnManagerViewSwitch;
                break;
            // no default
        }
        await element(locator).tap();
    };

    switchToManagerView = async () => {
        await this.switchRole(Role.MANAGER);
        await waitFor(element(this.btnApplyLeave))
            .not.toBeVisible()
            .withTimeout(10000);
    };

    switchToEmployeeView = async () => {
        await this.switchRole(Role.EMPLOYEE);
        await waitFor(element(this.btnApplyLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    tapApplyLeave = async () => {
        await element(this.btnApplyLeave).tap();
        await waitFor(element(this.btnConfirmLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    selectLeaveType = async (type: string) => {
        await element(this.getSelectLeaveTypeTestID(type)).tap();
    };

    selectLeaveDate = async (date: string) => {
        await element(this.btnSelectLeaveDate).tap();
        await waitFor(element(this.btnConfirmDate))
            .toBeVisible()
            .withTimeout(TIMEOUT);
        await element(this.getSelectLeaveDateTestID(date)).tap();
    };

    tapConfirmDate = async () => {
        await element(this.btnConfirmDate).tap();
        await waitFor(element(this.btnConfirmLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    selectLeaveDuration = async (duraton: LeaveDuration) => {
        await element(this.getSelectLeaveDurationLocator(duraton)).tap();
    };

    selectHalfDayLeaveType = async (leaveType: HalfDayLeaveType) => {
        await element(this.getSelectHalfDayLeaveTypeLocator(leaveType)).tap();
    };

    tapConfirmLeave = async () => {
        await element(this.btnConfirmLeave).tap();
    };

    verifyLeaveRequestConfirmed = async () => {
        await waitFor(element(this.lblConfirmHeader))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    tapProceedHome = async () => {
        await element(this.btnProceedToHome).tap();
    };

    tapUndoRequest = async () => {
        await element(this.btnUndoRequest).tap();
    };

    tapCancel = async () => {
        await element(this.btnCancel).tap();
    };

    getLeaveRequestIndexFromList = async (
        leaveDate: string,
        leaveType: string,
        leaveStatus: string,
    ) => {
        /* eslint-disable */
        let index = 0;
        let foundIndex = -1;
        const leaveRequestsCount = await getElementCount(
            this.listItemLeaveRequests,
        );
        for (; index < leaveRequestsCount; index += 1) {
            try {
                await expect(
                    element(this.getLeaveRequestDateByIndex(index)),
                ).toHaveText(leaveDate);
                const leaveTypeChipContent = await element(
                    this.getLeaveRequestTypeByIndex(index),
                ).getAttributes();
                jestExpect(leaveTypeChipContent.text).toContain(leaveType);
                await expect(
                    element(this.getLeaveRequestStatusIndicatorByIndex(index)),
                ).toHaveText(leaveStatus);
                foundIndex = index;
                break;
            } catch (error) {
                // Current item does not match
            }
        }
        /* eslint-enable */
        return foundIndex;
    };

    assertLeaveRequestExist = async (index: number) => {
        jestExpect(index).not.toBe(-1);
    };

    cancelLatestLeaveRequestByIndex = async (index: number) => {
        await element(this.getLeaveRequestStatusIndicatorByIndex(index)).tap();
        await waitFor(element(this.lblPendingLeaveStatus))
            .toBeVisible()
            .withTimeout(TIMEOUT);
        await element(this.btnCancelLeave).tap();
        await waitFor(element(this.lblCancelLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
        await element(this.btnCancelLeave).tap();
    };

    getManagerLeaveRequestIndexFromList = async (
        employeeName: string,
        leaveStatus: string,
        leaveDate: string,
    ) => {
        /* eslint-disable */
        let index = 0;
        let foundIndex = -1;
        const leaveRequestsCount = await getElementCount(
            this.listItemManagerLeaveRequests,
        );
        for (; index < leaveRequestsCount; index += 1) {
            try {
                await expect(
                    element(this.getManagerLeaveRequesterNameByIndex(index)),
                ).toHaveText(employeeName);
                const leaveRequestStatus = await element(
                    this.getManagerLeaveRequestStatusByIndex(index),
                ).getAttributes();
                jestExpect(leaveRequestStatus.text).toContain(leaveStatus);
                await expect(
                    element(this.getManagerLeaveRequestDateByIndex(index)),
                ).toHaveText(leaveDate);
                foundIndex = index;
                break;
            } catch (error) {
                // Current item does not match
            }
        }
        /* eslint-enable */
        return foundIndex;
    };

    viewManagerLeaveRequestInfoByIndex = async (index: number) => {
        await element(this.getManagerLeaveRequestStatusByIndex(index)).tap();
        await waitFor(element(this.btnApproveLeaveModal))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    viewManagerApprovedRequestInfoByIndex = async (index: number) => {
        await element(this.getManagerLeaveRequestStatusByIndex(index)).tap();
        await waitFor(element(this.btnRevokeApproval))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    assertRequestedLeaveDetails = async (
        leaveType: string,
        leaveDate: string,
        leaveDuration: string,
    ) => {
        const displayedLeaveType = await element(
            this.lblLeaveTypeModal,
        ).getAttributes();
        jestExpect(displayedLeaveType.text).toContain(leaveType);
        await expect(element(this.lblLeaveDateModal)).toHaveText(leaveDate);
        await expect(element(this.lblLeaveDurationModal)).toHaveText(
            leaveDuration,
        );
    };

    tapApproveLeaveRequest = async () => {
        await element(this.btnApproveLeaveModal).tap();
        await waitFor(element(this.lblLeaveRequestApproved))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    tapDeclineLeaveRequest = async () => {
        await element(this.btnDeclineLeaveModal).tap();
        await waitFor(element(this.btnConfirmDeclineLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    tapRevokeLeaveRequest = async () => {
        await element(this.btnRevokeApproval).tap();
        await waitFor(element(this.btnRequestRevoke))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    confirmDeclineLeave = async (declineReason: string) => {
        await waitFor(element(this.btnConfirmDeclineLeave))
            .toBeVisible()
            .withTimeout(TIMEOUT);
        await element(this.txtDeclineLeaveReason).typeText(declineReason);
        await element(this.btnConfirmDeclineLeave).tap();
        await waitFor(element(this.lblLeaveRequestDeclined))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };

    confirmRevokeLeave = async (revokeReason: string) => {
        await waitFor(element(this.btnRequestRevoke))
            .toBeVisible()
            .withTimeout(TIMEOUT);
        await element(this.txtRevokeReason).typeText(revokeReason);
        await element(this.btnRequestRevoke).tap();
        await waitFor(element(this.lblLeaveRevoked))
            .toBeVisible()
            .withTimeout(TIMEOUT);
    };
}
