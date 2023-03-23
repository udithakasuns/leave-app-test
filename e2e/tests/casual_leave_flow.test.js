/* eslint-disable */

import moment from 'moment';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen, {
    LeaveDuration,
    LeaveType,
    HalfDayLeaveType,
} from '../screens/HomeScreen';
import { getFormattedDate } from '../helpers';

describe('Employee Tests', () => {
    let loginScreen;
    let homeScreen;
    const empName = process.env.EMP_NAME;
    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;
    const managerUserName = process.env.MANAGER_USERNAME;
    const managerPassword = process.env.MANAGER_PASSWORD;

    const casualFullLeaveDate = moment().startOf('month').add(1, 'week').day(1);
    const casualFirstHalfLeaveDate = moment()
        .startOf('month')
        .add(1, 'week')
        .day(2);
    const casualSecondHalfLeaveDate = moment()
        .startOf('month')
        .add(1, 'week')
        .day(3);
    const casualCancelLeaveDate = moment()
        .startOf('month')
        .add(1, 'week')
        .day(4);
    const casualUndoLeaveDate = moment().startOf('month').add(1, 'week').day(5);

    const loginAsEmployee = async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(
            empUserName,
            empPassword,
        );
        await homeScreen.verifyDashboardLoaded();
    };

    const loginAsManager = async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(
            managerUserName,
            managerPassword,
        );
        await homeScreen.verifyDashboardLoaded();
    };

    beforeAll(async () => {
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        await device.launchApp({
            delete: true,
            permissions: { notifications: 'YES' },
        });
        await device.setURLBlacklist([
            '.*codepush.appcenter.ms.*',
            '.*in.appcenter.ms.*',
        ]);
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(
            empUserName,
            empPassword,
        );
        await homeScreen.verifyDashboardLoaded();
    });

    afterEach(async () => {
        await homeScreen.logoutUser();
    });

    it('Should be able to apply for a full day casual leave & get it approved', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(
            getFormattedDate(casualFullLeaveDate, 'YYYY-MM-DD'),
        );
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            '1 Day',
        );
        await homeScreen.tapApproveLeaveRequest();
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            'Casual',
            'Approved',
        );
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to undo a casual leave request', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(
            getFormattedDate(casualUndoLeaveDate, 'YYYY-MM-DD'),
        );
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapUndoRequest();
        await homeScreen.tapCancel();
        const index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualUndoLeaveDate, 'Do MMM'),
            'Casual',
            'Cancelled',
        );
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a first half casual leave & get approval revoked', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeScreen.selectLeaveDate(
            getFormattedDate(casualFirstHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Half Day - Morning',
        );
        await homeScreen.tapApproveLeaveRequest();
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerApprovedRequestInfoByIndex(index);
        await homeScreen.tapRevokeLeaveRequest();
        await homeScreen.confirmRevokeLeave('Test Reason');
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Revoked',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Revoked',
        );
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a second half casual leave & get it declined', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeScreen.selectLeaveDate(
            getFormattedDate(casualSecondHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Half Day - Evening',
        );
        await homeScreen.tapDeclineLeaveRequest();
        await homeScreen.confirmDeclineLeave('Test Reason');
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(
            empName,
            'Denied',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Denied',
        );
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to cancel a applied casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(
            getFormattedDate(casualCancelLeaveDate, 'YYYY-MM-DD'),
        );
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualCancelLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        await homeScreen.cancelLatestLeaveRequestByIndex(index);
        index = await homeScreen.getLeaveRequestIndexFromList(
            getFormattedDate(casualCancelLeaveDate, 'Do MMM'),
            'Casual',
            'Cancelled',
        );
        homeScreen.assertLeaveRequestExist(index);
    });
});
