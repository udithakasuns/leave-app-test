export default class LoginScreen {
    readonly TID: string = 'test:id/';

    // Element Locators

    readonly lblSignIn: Detox.NativeMatcher = by.text('Sign in');

    readonly btnNavgiateToPasswordLogin: Detox.NativeMatcher = by.text(
        'Log in with email and password',
    );

    readonly txtLoginEmail: Detox.NativeMatcher = by.id(
        `${this.TID}INPUT_EMAIL`,
    );

    readonly txtLoginPassword: Detox.NativeMatcher = by.id(
        `${this.TID}INPUT_PW`,
    );

    readonly btnLogin: Detox.NativeMatcher = by.text('Login');

    readonly lblInvalidUser: Detox.NativeMatcher = by.text('Invalid User');

    readonly btnProceed: Detox.NativeMatcher = by.text('Proceed');

    // Actions

    verifyLoginPageLoaded = async () => {
        await waitFor(element(this.lblSignIn)).toBeVisible().withTimeout(30000);
        await device.disableSynchronization();
    };

    tapLoginWithEmail = async () => {
        await element(this.btnNavgiateToPasswordLogin).tap();
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
        await element((this.txtLoginPassword)).tapReturnKey();
        await device.enableSynchronization();
    };

    loginByPasswordAuthentication = async (
        username: string,
        password: string,
    ) => {
        await this.clearEmail();
        await this.typeEmail(username);
        await this.clearPassword();
        await this.typePassword(password);
        await this.tapLogin();
    };
}
