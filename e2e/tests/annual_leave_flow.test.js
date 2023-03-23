/* eslint-disable */

import moment from 'moment';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen, { LeaveDuration, LeaveType, HalfDayLeaveType } from '../screens/HomeScreen';
import { getFormattedDate } from '../helpers';

describe('Annual Leave Tests', () => {
    let loginScreen;
    let homeScreen;
    const empName = process.env.EMP_NAME;
    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;    
    const managerUserName = process.env.MANAGER_USERNAME;
    const managerPassword = process.env.MANAGER_PASSWORD;  

    const annualFullLeaveDate = moment().startOf('month').add(2, 'week').day(1)
    const annualFirstHalfLeaveDate =  moment().startOf('month').add(2, 'week').day(2)
    const annualSecondHalfLeaveDate = moment().startOf('month').add(2, 'week').day(3)
    const annualCancelLeaveDate = moment().startOf('month').add(2, 'week').day(4)
    const annualUndoLeaveDate =  moment().startOf('month').add(2, 'week').day(5)

    const loginAsEmployee= async() => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(empUserName, empPassword);
        await homeScreen.verifyDashboardLoaded();
    }

    const loginAsManager = async() => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(managerUserName, managerPassword);
        await homeScreen.verifyDashboardLoaded();
    }

    beforeAll(async () => {
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        await device.launchApp({
            delete: true,
            permissions: { notifications: 'YES' }
        });
        await device.setURLBlacklist(['.*codepush\.appcenter\.ms.*','.*in\.appcenter\.ms.*']);
    });

    beforeEach(async () => {
        await device.reloadReactNative();
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(empUserName, empPassword);
        await homeScreen.verifyDashboardLoaded();
    });

    afterEach(async () => {
        await homeScreen.logoutUser();
    });

    it('Should be able to apply for a full day annual leave & get it approved', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.ANNUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(annualFullLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualFullLeaveDate, "Do MMM"), 'Annual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Pending', getFormattedDate(annualFullLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails('Annual',getFormattedDate(annualFullLeaveDate, "Do MMM"),'1 Day');
        await homeScreen.tapApproveLeaveRequest();
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Approved',getFormattedDate(annualFullLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualFullLeaveDate, "Do MMM"), 'Annual', 'Approved');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to undo a annual leave request', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.ANNUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(annualUndoLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapUndoRequest();
        await homeScreen.tapCancel();
        const index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualUndoLeaveDate, "Do MMM"), 'Annual', 'Cancelled');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a first half annual leave & get approval revoked', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.ANNUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeScreen.selectLeaveDate(getFormattedDate(annualFirstHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"), 'Annual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Pending', getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails('Annual',getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"),'Half Day - Morning');
        await homeScreen.tapApproveLeaveRequest();
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Approved',getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerApprovedRequestInfoByIndex(index);
        await homeScreen.tapRevokeLeaveRequest();
        await homeScreen.confirmRevokeLeave('Test Reason');
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Revoked',getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualFirstHalfLeaveDate, "Do MMM"), 'Annual', 'Revoked');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a second half annual leave & get it declined', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.ANNUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeScreen.selectLeaveDate(getFormattedDate(annualSecondHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualSecondHalfLeaveDate, "Do MMM"), 'Annual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsManager();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Pending', getFormattedDate(annualSecondHalfLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.viewManagerLeaveRequestInfoByIndex(index);
        await homeScreen.assertRequestedLeaveDetails('Annual',getFormattedDate(annualSecondHalfLeaveDate, "Do MMM"),'Half Day - Evening');
        await homeScreen.tapDeclineLeaveRequest();
        await homeScreen.confirmDeclineLeave('Test Reason');
        await homeScreen.tapProceedHome();
        index = await homeScreen.getManagerLeaveRequestIndexFromList(empName,'Denied',getFormattedDate(annualSecondHalfLeaveDate, "Do MMM"))
        homeScreen.assertLeaveRequestExist(index);
        await homeScreen.logoutUser();
        await loginAsEmployee();
        index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualSecondHalfLeaveDate, "Do MMM"), 'Annual', 'Denied');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to cancel a applied annual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.ANNUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(annualCancelLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualCancelLeaveDate, "Do MMM"), 'Annual', 'Pending');
        await homeScreen.cancelLatestLeaveRequestByIndex(index);
        index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(annualCancelLeaveDate, "Do MMM"), 'Annual', 'Cancelled');
        homeScreen.assertLeaveRequestExist(index);
    });
});

