import {
    lblSignIn,
    btnNavgiateToPasswordLogin,
    txtLoginEmail,
    txtLoginPassword,
} from '../locators/LoginLocators';

export default class LoginActions {
    // Actions

    verifyLoginPageLoaded = async () => {
        await waitFor(element(lblSignIn)).toBeVisible().withTimeout(30000);
    };

    tapLoginWithEmail = async () => {
        await element(btnNavgiateToPasswordLogin).tap();
    };

    clearEmail = async () => {
        await element(txtLoginEmail).clearText();
    };

    typeEmail = async (email: string) => {
        await element(txtLoginEmail).typeText(email);
    };

    clearPassword = async () => {
        await element(txtLoginPassword).clearText();
    };

    typePassword = async (password: string) => {
        await element(txtLoginPassword).typeText(password);
    };

    submitLogin = async () => {
        /* 
            Had to do this in a hacky way because if we try to tap Login button after typing password it will have a pending animation which block JS main loop.
            As a solution to this detox synchronization is disabled on page load and enabled after login is submitted
        */
        await element(txtLoginPassword).tapReturnKey();
    };

    loginByPasswordAuthentication = async (
        username: string,
        password: string,
    ) => {
        await this.clearEmail();
        await this.typeEmail(username);
        await this.clearPassword();
        await this.typePassword(password);
        await this.submitLogin();
    };
}
