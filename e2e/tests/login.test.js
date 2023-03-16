/* eslint-disable */

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

describe('Login Tests', () => {
    let loginScreen;
    let homeScreen;
    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;
    const managerUserName = process.env.MANAGER_USERNAME;
    const managerPassword = process.env.MANAGER_PASSWORD;

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
    });

    afterEach(async () => {
        await homeScreen.logoutUser();
    });

    it('Should be able to login as a manager', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(managerUserName, managerPassword);
        await homeScreen.verifyDashboardLoaded();
    });

    it('Should be able to login as an employee', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(empUserName, empPassword);
        await homeScreen.verifyDashboardLoaded();
    });

    it('Should be able to switch between employee & manager view', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.tapLoginWithEmail();
        await loginScreen.loginByPasswordAuthentication(managerUserName, managerPassword);
        await homeScreen.verifyDashboardLoaded();
        await homeScreen.tapRoleSwitcher();
        await homeScreen.switchToEmployeeView();
        await homeScreen.tapRoleSwitcher();
        await homeScreen.switchToManagerView();
    });
});
