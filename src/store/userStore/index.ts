import { create } from 'zustand';
import { State, Actions, User } from './types';

const initialUser: User = {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    designation: '',
    role: 'manager',
};

const initialState: State = {
    user: initialUser,
    userAuth: {
        loading: true,
        type: 'none',
    },
    error: '',
};

/* Note that, Only the userId & designation will be updated by an API, other rest of the data will be captured from AWS(AccessToken) */

const userStore = create<State & Actions>(set => ({
    ...initialState,
    setUser: (employee, userRole) => {
        set(() => ({
            user: {
                userId: employee.employeeId,
                email: employee.email,
                firstName: employee.name ?? employee.email,
                lastName: employee.lastName,
                designation: employee.designation,
                profilePic: employee.authPic,
                role: userRole,
            },
        }));
    },
    removeUser: () => set(() => ({ user: initialUser })),
    setUserAuth: userAuth => set(() => ({ userAuth })),
}));

export default userStore;
