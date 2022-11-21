import { EmployeeType } from 'utils/types';

export interface State {
    employee: EmployeeType;
    isAutherized: boolean;
    loading: boolean;
    error: string;
}

export type Actions = {
    saveUser: () => void;
    removeUser: () => void;
    setLoading: (state: boolean) => void;
    setIsAutherized: (isAutherized: boolean) => void;
};
