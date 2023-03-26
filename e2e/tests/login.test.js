import LoginActions from '../actions/LoginActions';
import HomeActions from '../actions/HomeActions';

describe('Login Tests', () => {
    let loginActions;
    let homeActions;

    const empUserName = process.env.EMP_USERNAME;
    const empPassword = process.env.EMP_PASSWORD;
    const managerUserName = process.env.MANAGER_USERNAME;
    const managerPassword = process.env.MANAGER_PASSWORD;

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
    });

    afterEach(async () => {
        await homeActions.logoutUser();
    });

    it('Should be able to login as a manager', async () => {
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            managerUserName,
            managerPassword,
        );
        await homeActions.verifyDashboardLoaded();
    });

    it('Should be able to login as an employee', async () => {
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            empUserName,
            empPassword,
        );
        await homeActions.verifyDashboardLoaded();
    });

    it('Should be able to switch between employee & manager view', async () => {
        await loginActions.verifyLoginPageLoaded();
        await loginActions.tapLoginWithEmail();
        await loginActions.loginByPasswordAuthentication(
            managerUserName,
            managerPassword,
        );
        await homeActions.verifyDashboardLoaded();
        await homeActions.tapRoleSwitcher();
        await homeActions.switchToEmployeeView();
        await homeActions.tapRoleSwitcher();
        await homeActions.switchToManagerView();
    });
});
