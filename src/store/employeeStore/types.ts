import { LeaveRequestByID } from 'utils/types';

export type State = {
    employeeRequest: LeaveRequestByID;
};

export type Actions = {
    setLeaveRequestByID: (requestedId: number) => void;
    setLeaveRequest: (managerRequest: LeaveRequestByID) => void;
};
