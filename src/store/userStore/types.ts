import { UserRole, UserType } from 'utils/types';

export interface State {
    user: UserType;
    authLoading: boolean;
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
    setAuthLoading: (authLoading: boolean) => void;
};
