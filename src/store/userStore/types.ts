import { UserRole, UserType } from 'utils/types';

type UserAuthType = 'social' | 'general' | 'none';

type UserAuth = {
    loading: boolean;
    type: UserAuthType;
};

export interface State {
    user: UserType;
    userAuth: UserAuth;
    error: string;
}

export type Actions = {
    saveUser: (
        email: string,
        firstName: string,
        lastName: string,
        profilePic: string,
        role: UserRole,
    ) => void;
    updateUser: () => void;
    removeUser: () => void;
    setUserAuth: (userAuth: UserAuth) => void;
};
