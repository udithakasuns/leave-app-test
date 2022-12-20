import { LeaveRequestByID } from 'utils/types';

export type State = {
    isEmployeeModalLoading: boolean;
    employeeRequest: LeaveRequestByID;
    refreshEmployeeHomeState: boolean;
};

export type Actions = {
    setRefreshEmployeeHomeState: (refreshEmployeeHomeState: boolean) => void;
    getEmployeeModal: (requestedId: number) => void;
    setEmployeeRequest: (employeeRequest: LeaveRequestByID) => void;
    resetEmployeeRequest: () => void;
};
