import { LeaveRequestByID } from 'utils/types';

export type State = {
    employeeRequest: LeaveRequestByID;
};

export type Actions = {
    getEmployeeModal: (requestedId: number) => void;
    setEmployeeRequest: (employeeRequest: LeaveRequestByID) => void;
};
