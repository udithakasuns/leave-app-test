export type AuthSocialUserPayload = {
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

export type AuthGeneralUserPayload = {
    Session: null;
    attributes: {
        email: string;
        email_verified: boolean;
        phone_number: string;
        phone_number_verified: boolean;
        sub: string;
    };
    authenticationFlowType: string;
    client: {
        endpoint: string;
        fetchOptions: any[];
    };
    keyPrefix: string;
    pool: {
        advancedSecurityDataCollectionFlag: boolean;
        client: any[];
        clientId: string;
        storage: any[];
        userPoolId: string;
        wrapRefreshSessionCallback: any[];
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

export type AccessTokenPayload = {
    auth_time: number;
    client_id: string;
    'cognito:groups': string[];
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    origin_jti: string;
    scope: string;
    sub: string;
    token_use: string;
    username: string;
    version: number;
};
