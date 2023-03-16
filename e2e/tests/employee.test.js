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

    let casualFullLeaveDate = moment().add(0, 'week').day(1) // Current Week Monday
    let casualFirstHalfLeaveDate = moment().add(0, 'week').day(2) // Current Week Tuesday
    let casualSecondHalfLeaveDate = moment().add(0, 'week').day(3) // Current Week Wednesday
    let casualCancelLeaveDate = moment().add(0, 'week').day(4) // Current Week Thursday
    let casualUndoLeaveDate = moment().add(0, 'week').day(5) // Current Week Friday

    beforeAll(async () => {
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        await device.launchApp({
            delete: true,
            permissions: { notifications: 'YES' },
        });
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

    it.skip('Should be able to apply for a full day casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualFullLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualFullLeaveDate, "Do MMM"), 'Casual', 'Pending');
    });

    it.skip('Should be able to undo a casual leave request', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualUndoLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapUndoRequest();
        await homeScreen.tapCancel();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualUndoLeaveDate, "Do MMM"), 'Casual', 'Cancelled');
    });

    it.skip('Should be able to apply for a first half casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.MORNING);
        await homeScreen.selectLeaveDate(getFormattedDate(casualFirstHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualFirstHalfLeaveDate, "Do MMM"), 'Casual', 'Pending');
    });

    it.skip('Should be able to apply for a second half casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeScreen.selectLeaveDate(getFormattedDate(casualSecondHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualSecondHalfLeaveDate, "Do MMM"), 'Casual', 'Pending');
    });

    it.skip('Should be able to cancel a applied casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDate(getFormattedDate(casualCancelLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualCancelLeaveDate, "Do MMM"), 'Casual', 'Pending');
        await homeScreen.cancelLatestLeaveRequest();
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualCancelLeaveDate, "Do MMM"), 'Casual', 'Cancelled');
    });
});

