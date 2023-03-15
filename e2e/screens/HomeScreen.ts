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

    // Leave Requests List Locators in Employee Home

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

    // Actions

    verifyDashboardLoaded = async () => {
        await waitFor(element(this.lblGreeting))
            .toBeVisible()
            .withTimeout(10000);
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
            .withTimeout(10000);
    };

    tapApplyLeave = async () => {
        await element(this.btnApplyLeave).tap();
        await waitFor(element(this.btnConfirmLeave))
            .toBeVisible()
            .withTimeout(10000);
    };

    selectLeaveType = async (type: string) => {
        await element(this.getSelectLeaveTypeTestID(type)).tap();
    };

    selectLeaveDate = async (date: string) => {
        await element(this.btnSelectLeaveDate).tap();
        await waitFor(element(this.btnConfirmDate))
            .toBeVisible()
            .withTimeout(10000);
        await element(this.getSelectLeaveDateTestID(date)).tap();
    };

    tapConfirmDate = async () => {
        await element(this.btnConfirmDate).tap();
        await waitFor(element(this.btnConfirmLeave))
            .toBeVisible()
            .withTimeout(10000);
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
            .withTimeout(10000);
    };

    tapProceedHome = async () => {
        await element(this.btnProceedToHome).tap();
    };

    assertLatestLeaveRequest = async (
        leaveDate: string,
        leaveType: string,
        leaveStatus: string,
    ) => {
        await expect(element(this.getLeaveRequestDateByIndex(0))).toHaveText(
            leaveDate,
        );
        await expect(element(this.getLeaveRequestTypeByIndex(0))).toHaveText(
            leaveType,
        );
        await expect(
            element(this.getLeaveRequestStatusIndicatorByIndex(0)),
        ).toHaveText(leaveStatus);
    };
}
