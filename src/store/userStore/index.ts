import create from 'zustand';
import { EmployeeType, UserType, UserRole } from 'utils/types';
import { getHttpEmployee } from 'services/http';
import { State, Actions } from './types';

const initialUser: UserType = {
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
    loading: false,
    error: '',
};

/* Note that, Only the userId & designation will be updated by an API, other rest of the data will be captured from AWS(AccessToken) */

const userStore = create<State & Actions>(set => ({
    ...initialState,
    saveUser: (
        email: string,
        firstName: string,
        lastName: string,
        profilePic: string,
        role: UserRole,
    ) =>
        set(state => ({
            ...state,
            user: {
                ...state.user,
                email,
                firstName,
                lastName,
                profilePic,
                role,
            },
        })),
    updateUser: async () => {
        const res = await getHttpEmployee();
        const employee: EmployeeType = res.results[0];
        set(state => ({
            ...state,
            user: {
                ...state.user,
                userId: employee.employeeId,
                designation: employee.designation || '',
            },
        }));
    },
    removeUser: () => set(state => ({ ...state, user: initialUser })),
    setLoading: loading => set(state => ({ ...state, loading })),
}));

export default userStore;
