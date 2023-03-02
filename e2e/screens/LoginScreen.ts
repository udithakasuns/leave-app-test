import { isElementVisible } from '../helpers';

export default class LoginScreen {
    // Element Locators
    readonly lblSignIn: Detox.NativeMatcher = by.text('Sign in');

    readonly txtLoginEmail: Detox.NativeMatcher = by.id('txtLoginEmail');

    readonly txtLoginPassword: Detox.NativeMatcher = by.id('txtLoginPassword');

    readonly btnLogin: Detox.NativeMatcher = by.id('btnLogin');

    readonly lblInvalidUser: Detox.NativeMatcher = by.text('Invalid User');

    readonly btnProceed: Detox.NativeMatcher = by.text('Proceed');

    readonly lblGreeting: Detox.NativeMatcher = by.id('txtGreetingManagerHome');

    // Actions

    checkLoginPageLoaded = async () => {
        await expect(element(this.lblSignIn)).toBeVisible();
    };

    clearEmail = async () => {
        await element(this.txtLoginEmail).clearText();
    };

    typeEmail = async (email: string) => {
        await element(this.txtLoginEmail).typeText(email);
    };

    clearPassword = async () => {
        await element(this.txtLoginPassword).clearText();
    };

    typePassword = async (password: string) => {
        await element(this.txtLoginPassword).typeText(password);
    };

    tapLogin = async () => {
        await element(this.btnLogin).tap();
    };

    acceptInvalidUserPopup = async () => {
        const popupVisible = await isElementVisible(this.lblInvalidUser);
        if (popupVisible) {
            await element(this.btnProceed).tap();
        }
    };

    checkEmployeeHomeLoaded = async () => {
        await expect(element(this.lblGreeting)).toBeVisible();
    };
}
