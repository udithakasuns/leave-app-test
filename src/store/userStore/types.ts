import { EmployeeType, UserRole } from 'utils/types';

type UserAuthType = 'social' | 'general' | 'none';

type UserAuth = {
    loading: boolean;
    type: UserAuthType;
};

export interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    designation: string;
    role: UserRole;
}

export interface State {
    user: User;
    userAuth: UserAuth;
    error: string;
}

export type Actions = {
    removeUser: () => void;
    setUser: (employee: EmployeeType, role: UserRole) => void;
    setUserAuth: (userAuth: UserAuth) => void;
};
