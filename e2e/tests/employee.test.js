/* eslint-disable */

import moment from 'moment';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen, { LeaveDuration, LeaveType, HalfDayLeaveType } from '../screens/HomeScreen';
import { getFormattedDate } from '../helpers';

describe('Employee Tests', () => {
    let loginScreen;
    let homeScreen;

    let casualFullLeaveDate = moment().add(0, 'week').day(1) // Current Week Monday
    let casualFirstHalfLeaveDate = moment().add(0, 'week').day(2) // Current Week Tuesday
    let casualSecondHalfLeaveDate = moment().add(0, 'week').day(3) // Current Week Wednesday
    let casualCancelLeaveDate = moment().add(0, 'week').day(4) // Current Week Thursday

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
        await loginScreen.loginByPasswordAuthentication('udithakasun311@gmail.com', '^67Svi6DsqMe@j');
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
        await homeScreen.assertLatestLeaveRequest(getFormattedDate(casualFullLeaveDate, "Do MMM"),'Casual', 'Pending');
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
    });

    it('Should be able to apply for a second half casual leave', async () => {
        await homeScreen.tapApplyLeave();
        await homeScreen.selectLeaveType(LeaveType.CASUAL);
        await homeScreen.selectLeaveDuration(LeaveDuration.HALF_DAY);
        await homeScreen.selectHalfDayLeaveType(HalfDayLeaveType.EVENING);
        await homeScreen.selectLeaveDate(getFormattedDate(casualFirstHalfLeaveDate, "YYYY-MM-DD"));
        await homeScreen.tapConfirmDate();
        await homeScreen.tapConfirmLeave();
        await homeScreen.verifyLeaveRequestConfirmed();
        await homeScreen.tapProceedHome();
    });
});

