import moment from 'moment';
import LoginActions from '../actions/LoginActions';
import HomeActions from '../actions/HomeActions';
import {
    LeaveDuration,
    LeaveType,
    HalfDayLeaveType,
} from '../helpers/constants';
import { getFormattedDate } from '../helpers/methods';

describe('Annual Leave Tests', () => {
    let loginActions;
    let homeActions;

    const empName = process.env.EMP_NAME;
    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;
    const managerUserName = process.env.MANAGER_USERNAME;
    const managerPassword = process.env.MANAGER_PASSWORD;

    const annualFullLeaveDate = moment().startOf('month').add(2, 'week').day(1);
    const annualFirstHalfLeaveDate = moment()
        .startOf('month')
        .add(2, 'week')
        .day(2);
    const annualSecondHalfLeaveDate = moment()
        .startOf('month')
        .add(2, 'week')
        .day(3);
    const annualCancelLeaveDate = moment()
        .startOf('month')
        .add(2, 'week')
        .day(4);
    const annualUndoLeaveDate = moment().startOf('month').add(2, 'week').day(5);

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

    it('Should be able to apply for a full day annual leave & get it approved', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.ANNUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(annualFullLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualFullLeaveDate, 'Do MMM'),
            'Annual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(annualFullLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Annual',
            getFormattedDate(annualFullLeaveDate, 'Do MMM'),
            '1 Day',
        );
        await homeActions.tapApproveLeaveRequest();
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(annualFullLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualFullLeaveDate, 'Do MMM'),
            'Annual',
            'Approved',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to undo a annual leave request', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.ANNUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(annualUndoLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapUndoRequest();
        await homeActions.tapCancel();
        const index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualUndoLeaveDate, 'Do MMM'),
            'Annual',
            'Cancelled',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a first half annual leave & get approval revoked', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.ANNUAL);
        await homeActions.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeActions.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeActions.selectLeaveDate(
            getFormattedDate(annualFirstHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
            'Annual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Annual',
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
            'Half Day - Morning',
        );
        await homeActions.tapApproveLeaveRequest();
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Approved',
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerApprovedRequestInfoByIndex(index);
        await homeActions.tapRevokeLeaveRequest();
        await homeActions.confirmRevokeLeave('Test Reason');
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Revoked',
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualFirstHalfLeaveDate, 'Do MMM'),
            'Annual',
            'Revoked',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a second half annual leave & get it declined', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.ANNUAL);
        await homeActions.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeActions.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeActions.selectLeaveDate(
            getFormattedDate(annualSecondHalfLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualSecondHalfLeaveDate, 'Do MMM'),
            'Annual',
            'Pending',
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsManager();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Pending',
            getFormattedDate(annualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.viewManagerLeaveRequestInfoByIndex(index);
        await homeActions.assertRequestedLeaveDetails(
            'Annual',
            getFormattedDate(annualSecondHalfLeaveDate, 'Do MMM'),
            'Half Day - Evening',
        );
        await homeActions.tapDeclineLeaveRequest();
        await homeActions.confirmDeclineLeave('Test Reason');
        await homeActions.tapProceedHome();
        index = await homeActions.getManagerLeaveRequestIndexFromList(
            empName,
            'Denied',
            getFormattedDate(annualSecondHalfLeaveDate, 'Do MMM'),
        );
        homeActions.assertLeaveRequestExist(index);
        await homeActions.logoutUser();
        await loginAsEmployee();
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualSecondHalfLeaveDate, 'Do MMM'),
            'Annual',
            'Denied',
        );
        homeActions.assertLeaveRequestExist(index);
    });

    it('Should be able to cancel a applied annual leave', async () => {
        await homeActions.tapApplyLeave();
        await homeActions.selectLeaveType(LeaveType.ANNUAL);
        await homeActions.selectLeaveDate(
            getFormattedDate(annualCancelLeaveDate, 'YYYY-MM-DD'),
        );
        await homeActions.tapConfirmDate();
        await homeActions.tapConfirmLeave();
        await homeActions.verifyLeaveRequestConfirmed();
        await homeActions.tapProceedHome();
        let index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualCancelLeaveDate, 'Do MMM'),
            'Annual',
            'Pending',
        );
        await homeActions.cancelLatestLeaveRequestByIndex(index);
        index = await homeActions.getLeaveRequestIndexFromList(
            getFormattedDate(annualCancelLeaveDate, 'Do MMM'),
            'Annual',
            'Cancelled',
        );
        homeActions.assertLeaveRequestExist(index);
    });
});
