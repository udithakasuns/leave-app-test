const TID = 'test:id/';

export const lblSignIn: Detox.NativeMatcher = by.text('Sign in');

export const btnNavgiateToPasswordLogin: Detox.NativeMatcher = by.text(
    'Log in with email and password',
);

export const txtLoginEmail: Detox.NativeMatcher = by.id(`${TID}INPUT_EMAIL`);

export const txtLoginPassword: Detox.NativeMatcher = by.id(`${TID}INPUT_PW`);

export const btnLogin: Detox.NativeMatcher = by.text('Login');

export const lblInvalidUser: Detox.NativeMatcher = by.text('Invalid User');

export const btnProceed: Detox.NativeMatcher = by.text('Proceed');
