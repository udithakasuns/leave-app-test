import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

export const awsOnGoogleSignIn = () => {
    Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
    });
};

export const awsOnGoogleSignOut = () => {
    Auth.signOut();
};
