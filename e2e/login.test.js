/* eslint-disable */

import LoginScreen, { isElementVisible } from './screens/LoginScreen';

describe('Login Tests', () => {
    let loginScreen;
    beforeAll(async () => {
        loginScreen = new LoginScreen();
        await device.launchApp({
            delete: true,
            permissions: { notifications: 'YES' },
        });
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should be able to login using password based authentication', async () => {
        await loginScreen.checkLoginPageLoaded();
        await loginScreen.clearEmail();
        await loginScreen.typeEmail('tharindusilva095@gmail.com');
        await loginScreen.clearPassword();
        await loginScreen.typePassword('Test@1234');
        await loginScreen.tapLogin();
        await loginScreen.acceptInvalidUserPopup();
        await loginScreen.checkEmployeeHomeLoaded();
    });
});
