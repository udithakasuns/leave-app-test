/* eslint-disable */

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

describe('Login Tests', () => {
    let loginScreen;
    let homeScreen;
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
    });

    afterEach(async () => {
        await homeScreen.logoutUser();
    });

    it('Should be able to login as a manager', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.loginByPasswordAuthentication('tharindusilva095@gmail.com', 'Test@1234');
        await homeScreen.verifyDashboardLoaded();
    });

    it('Should be able to login as an employee', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.loginByPasswordAuthentication('udithakasun311@gmail.com', '^67Svi6DsqMe@j');
        await homeScreen.verifyDashboardLoaded();
    });

    it('Should be able to switch between employee & manager view', async () => {
        await loginScreen.verifyLoginPageLoaded();
        await loginScreen.loginByPasswordAuthentication('tharindusilva095@gmail.com', 'Test@1234');
        await homeScreen.verifyDashboardLoaded();
        await homeScreen.tapRoleSwitcher();
        await homeScreen.switchToEmployeeView();
        await homeScreen.tapRoleSwitcher();
        await homeScreen.switchToManagerView();
    });
});
