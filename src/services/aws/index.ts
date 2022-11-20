import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export const awsOnGoogleSignIn = async () =>
    Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
    });

export const awsOnGoogleSignOut = async () => {
    Auth.signOut();
};
