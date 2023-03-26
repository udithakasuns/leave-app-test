import { expect as jestExpect } from '@jest/globals';
import {
    getElementCount,
    expectElementToHaveText,
    expectElementToContainText,
} from '../helpers/methods';
import { Role, LeaveDuration, HalfDayLeaveType } from '../helpers/constants';
import {
    lblGreeting,
    lblConfirmHeader,
    lblRoleSwitcher,
    lblPendingLeaveStatus,
    lblCancelLeave,
    lblLeaveTypeModal,
    lblLeaveDateModal,
    lblLeaveDurationModal,
    lblLeaveRequestApproved,
    lblLeaveRequestDeclined,
    lblLeaveRevoked,
    btnAvatar,
    btnLogout,
    btnEmployeeViewSwitch,
    btnManagerViewSwitch,
    btnApplyLeave,
    btnConfirmLeave,
    btnSelectLeaveDate,
    btnConfirmDate,
    btnProceedToHome,
    btnUndoRequest,
    btnCancel,
    btnCancelLeave,
    btnApproveLeaveModal,
    btnRevokeApproval,
    btnRequestRevoke,
    btnConfirmDeclineLeave,
    btnDeclineLeaveModal,
    drpdownRoleSwitcher,
    listItemLeaveRequests,
    listItemManagerLeaveRequests,
    txtDeclineLeaveReason,
    txtRevokeReason,
    getSelectLeaveTypeTestID,
    getSelectLeaveDateTestID,
    getSelectLeaveDurationLocator,
    getSelectHalfDayLeaveTypeLocator,
    getLeaveRequestDateByIndex,
    getLeaveRequestTypeByIndex,
    getLeaveRequestStatusIndicatorByIndex,
    getManagerLeaveRequesterNameByIndex,
    getManagerLeaveRequestStatusByIndex,
    getManagerLeaveRequestDateByIndex,
} from '../locators/HomeLocators';

/* eslint-disable consistent-return */

const HOME_SCREEN_TIMEOUT = 30000;

export default class HomeActions {
    verifyDashboardLoaded = async () => {
        await waitFor(element(lblGreeting))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    tapProfile = async () => {
        await element(btnAvatar).tap();
    };

    logoutUser = async () => {
        await this.tapProfile();
        await element(btnLogout).tap();
    };

    tapRoleSwitcher = async () => {
        await element(drpdownRoleSwitcher).tap();
        await waitFor(element(lblRoleSwitcher))
            .toBeVisible()
            .withTimeout(10000);
    };

    switchRole = async (role: Role) => {
        let locator;
        switch (role) {
            case Role.EMPLOYEE:
                locator = btnEmployeeViewSwitch;
                break;
            case Role.MANAGER:
                locator = btnManagerViewSwitch;
                break;
            default:
                locator = btnEmployeeViewSwitch;
        }
        await element(locator).tap();
    };

    switchToManagerView = async () => {
        await this.switchRole(Role.MANAGER);
        await waitFor(element(btnApplyLeave))
            .not.toBeVisible()
            .withTimeout(10000);
    };

    switchToEmployeeView = async () => {
        await this.switchRole(Role.EMPLOYEE);
        await waitFor(element(btnApplyLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    tapApplyLeave = async () => {
        await element(btnApplyLeave).tap();
        await waitFor(element(btnConfirmLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    selectLeaveType = async (type: string) => {
        await element(getSelectLeaveTypeTestID(type)).tap();
    };

    selectLeaveDate = async (date: string) => {
        await element(btnSelectLeaveDate).tap();
        await waitFor(element(btnConfirmDate))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
        await element(getSelectLeaveDateTestID(date)).tap();
    };

    tapConfirmDate = async () => {
        await element(btnConfirmDate).tap();
        await waitFor(element(btnConfirmLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    selectLeaveDuration = async (duraton: LeaveDuration) => {
        await element(getSelectLeaveDurationLocator(duraton)).tap();
    };

    selectHalfDayLeaveType = async (leaveType: HalfDayLeaveType) => {
        await element(getSelectHalfDayLeaveTypeLocator(leaveType)).tap();
    };

    tapConfirmLeave = async () => {
        await element(btnConfirmLeave).tap();
    };

    verifyLeaveRequestConfirmed = async () => {
        await waitFor(element(lblConfirmHeader))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    tapProceedHome = async () => {
        await element(btnProceedToHome).tap();
    };

    tapUndoRequest = async () => {
        await element(btnUndoRequest).tap();
    };

    tapCancel = async () => {
        await element(btnCancel).tap();
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
            listItemLeaveRequests,
        );
        for (; index < leaveRequestsCount; index += 1) {
            try {
                await expectElementToHaveText(getLeaveRequestDateByIndex(index), leaveDate);
                await expectElementToContainText(getLeaveRequestTypeByIndex(index), leaveType);
                await expectElementToHaveText(getLeaveRequestStatusIndicatorByIndex(index), leaveStatus);
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
        await element(getLeaveRequestStatusIndicatorByIndex(index)).tap();
        await waitFor(element(lblPendingLeaveStatus))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
        await element(btnCancelLeave).tap();
        await waitFor(element(lblCancelLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
        await element(btnCancelLeave).tap();
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
            listItemManagerLeaveRequests,
        );
        for (; index < leaveRequestsCount; index += 1) {
            try {
                await expectElementToHaveText(getManagerLeaveRequesterNameByIndex(index), employeeName);
                await expectElementToContainText(getManagerLeaveRequestStatusByIndex(index), leaveStatus);
                await expectElementToHaveText(getManagerLeaveRequestDateByIndex(index), leaveDate);
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
        await element(getManagerLeaveRequestStatusByIndex(index)).tap();
        await waitFor(element(btnApproveLeaveModal))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    viewManagerApprovedRequestInfoByIndex = async (index: number) => {
        await element(getManagerLeaveRequestStatusByIndex(index)).tap();
        await waitFor(element(btnRevokeApproval))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    assertRequestedLeaveDetails = async (
        leaveType: string,
        leaveDate: string,
        leaveDuration: string,
    ) => {
        await expectElementToContainText(lblLeaveTypeModal, leaveType);
        await expectElementToHaveText(lblLeaveDateModal, leaveDate);
        await expectElementToHaveText(lblLeaveDurationModal, leaveDuration);
    };

    tapApproveLeaveRequest = async () => {
        await element(btnApproveLeaveModal).tap();
        await waitFor(element(lblLeaveRequestApproved))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    tapDeclineLeaveRequest = async () => {
        await element(btnDeclineLeaveModal).tap();
        await waitFor(element(btnConfirmDeclineLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    tapRevokeLeaveRequest = async () => {
        await element(btnRevokeApproval).tap();
        await waitFor(element(btnRequestRevoke))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    confirmDeclineLeave = async (declineReason: string) => {
        await waitFor(element(btnConfirmDeclineLeave))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
        await element(txtDeclineLeaveReason).typeText(declineReason);
        await element(btnConfirmDeclineLeave).tap();
        await waitFor(element(lblLeaveRequestDeclined))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };

    confirmRevokeLeave = async (revokeReason: string) => {
        await waitFor(element(btnRequestRevoke))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
        await element(txtRevokeReason).typeText(revokeReason);
        await element(btnRequestRevoke).tap();
        await waitFor(element(lblLeaveRevoked))
            .toBeVisible()
            .withTimeout(HOME_SCREEN_TIMEOUT);
    };
}
