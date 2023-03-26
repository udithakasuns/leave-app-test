import moment from 'moment';
import LoginActions from '../actions/LoginActions';
import HomeActions from '../actions/HomeActions';
import {
    LeaveDuration,
    LeaveType,
    HalfDayLeaveType,
} from '../helpers/constants';
import { getFormattedDate } from '../helpers/methods';

describe('Employee Tests', () => {
    let loginActions;
    let homeActions;

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
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            empUserName,
            empPassword,
        );
        await homeActions.verifyDashboardLoaded();
    };

    const loginAsManager = async () => {
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            managerUserName,
            managerPassword,
        );
        await homeActions.verifyDashboardLoaded();
    };

    beforeAll(async () => {
        loginActions = new LoginActions();
        homeActions = new HomeActions();
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
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            empUserName,
            empPassword,
        );
        await homeActions.verifyDashboardLoaded();
    });

    afterEach(async () => {
        await homeActions.logoutUser();
    });

    it('Should be able to apply for a full day casual leave & get it approved', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.CASUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(casualFullLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            '1 Day',
        );
        await homeActions.tapApproveLeaveRequest();
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualFullLeaveDate, 'Do MMM'),
            'Casual',
            'Approved',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to undo a casual leave request', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.CASUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(casualUndoLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapUndoRequest();
        await homeActions.tapCancel();
        const index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualUndoLeaveDate, 'Do MMM'),
            'Casual',
            'Cancelled',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a first half casual leave & get approval revoked', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.CASUAL);
        await homeActions.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeActions.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeActions.selectLeaveDate(
            getFormattedDate(casualFirstHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Half Day - Morning',
        );
        await homeActions.tapApproveLeaveRequest();
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerApprovedRequestInfoByIndex(index);
        await homeActions.tapRevokeLeaveRequest();
        await homeActions.confirmRevokeLeave('Test Reason');
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Revoked',
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualFirstHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Revoked',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a second half casual leave & get it declined', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.CASUAL);
        await homeActions.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeActions.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeActions.selectLeaveDate(
            getFormattedDate(casualSecondHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Casual',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Half Day - Evening',
        );
        await homeActions.tapDeclineLeaveRequest();
        await homeActions.confirmDeclineLeave('Test Reason');
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Denied',
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualSecondHalfLeaveDate, 'Do MMM'),
            'Casual',
            'Denied',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to cancel a applied casual leave', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.CASUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(casualCancelLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualCancelLeaveDate, 'Do MMM'),
            'Casual',
            'Pending',
        );
        await homeActions.cancelLatestLeaveRequestByIndex(index);
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(casualCancelLeaveDate, 'Do MMM'),
            'Casual',
            'Cancelled',
        );
        homeActions.assertLeaveRequestExist(index);
    });
});
