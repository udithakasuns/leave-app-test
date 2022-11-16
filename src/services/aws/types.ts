export type SigninPayload = {
    Session: null;
    attributes: {
        email: string;
        email_verified: boolean;
        family_name: string;
        identities: [];
        name: string;
        picture: string;
        sub: string;
    };
    authenticationFlowType: string;
    client: {
        endpoint: string;
        fetchOptions: string;
    };
    keyPrefix: string;
    pool: {
        advancedSecurityDataCollectionFlag: boolean;
        client: {
            endpoint: string;
            fetchOptions: [];
        };
        clientId: string;
        storage: [];
        userPoolId: string;
        wrapRefreshSessionCallback: [];
    };
    preferredMFA: string;
    signInUserSession: {
        accessToken: {
            jwtToken: string;
            payload: [];
        };
        clockDrift: number;
        idToken: {
            jwtToken: string;
            payload: [];
        };
        refreshToken: {
            token: string;
        };
    };
    storage: [];
    userDataKey: string;
    username: string;
};
