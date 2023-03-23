/* eslint-disable */

import moment from 'moment';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen, { LeaveDuration, LeaveType, HalfDayLeaveType } from '../screens/HomeScreen';
import { getFormattedDate } from '../helpers';

describe('Employee Tests', () => {
    let loginScreen;
    let homeScreen;
    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;    

    const casualFullLeaveDate = moment().startOf('month').add(1, 'week').day(1)
    const casualFirstHalfLeaveDate = moment().startOf('month').add(1, 'week').day(2)
    const casualSecondHalfLeaveDate = moment().startOf('month').add(1, 'week').day(3)
    const casualCancelLeaveDate = moment().startOf('month').add(1, 'week').day(4)
    const casualUndoLeaveDate = moment().startOf('month').add(1, 'week').day(5)

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

    it('Should be able to apply for a full day casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualFullLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        const index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualFullLeaveDate, "Do MMM"), 'Casual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to undo a casual leave request', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualUndoLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapUndoRequest();
        await homeScreen.tapCancel();
        const index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualUndoLeaveDate, "Do MMM"), 'Casual', 'Cancelled');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a first half casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeScreen.selectLeaveDate(getFormattedDate(casualFirstHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        const index =  await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualFirstHalfLeaveDate, "Do MMM"), 'Casual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to apply for a second half casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeScreen.selectLeaveDate(getFormattedDate(casualSecondHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        const index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualSecondHalfLeaveDate, "Do MMM"), 'Casual', 'Pending');
        homeScreen.assertLeaveRequestExist(index);
    });

    it('Should be able to cancel a applied casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualCancelLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        let index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualCancelLeaveDate, "Do MMM"), 'Casual', 'Pending');
        await homeScreen.cancelLatestLeaveRequestByIndex(index);
        index = await homeScreen.getLeaveRequestIndexFromList(getFormattedDate(casualCancelLeaveDate, "Do MMM"), 'Casual', 'Cancelled');
        homeScreen.assertLeaveRequestExist(index);
    });
});

