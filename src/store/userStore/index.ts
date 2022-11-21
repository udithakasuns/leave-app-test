import create from 'zustand';
import { EmployeeType } from 'utils/types';
import { getHttpEmployee } from 'services/http';
import { State, Actions } from './types';

const employee: EmployeeType = {
    employeeId: '',
    authPic: '',
    designation: '',
    name: '',
};

const initialState: State = {
    employee,
    isAutherized: false,
    loading: false,
    error: '',
};

const userStore = create<State & Actions>(set => ({
    ...initialState,
    saveUser: () =>
        getHttpEmployee()
            .then(res => {
                const employeeData: EmployeeType = res.results[0];
                set(state => ({ ...state, employee: employeeData }));
            })
            .catch(err => {
                set(state => ({ ...state, error: err }));
            }),
    setIsAutherized: isAutherized => set(state => ({ ...state, isAutherized })),
    removeUser: () => set(state => ({ ...state, ...employee })),
    setLoading: loading => set(state => ({ ...state, loading })),
}));

export default userStore;
