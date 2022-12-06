import { LeaveRequestByID } from 'src/utils/types';
import create from 'zustand';
import { getHttpLeaveRequestByID } from '../../services/http/getRequest/index';
import { Actions, State } from './types';

const initialState: State = {
    employeeRequest: {
        leaveRequestId: 0,
        startDate: '',
        endDate: '',
        leaveType: { name: '', typeId: 0 },
        status: 'APPROVED',
        leaveState: 'FULLDAY',
        requestDesc: '',
        durationHours: 0,
        durationDays: 0,
        employee: {
            authPic: '',
            designation: '',
            employeeId: '',
            name: '',
        },
        reviewer: {
            authPic: '',
            designation: '',
            employeeId: '',
            name: '',
        },
        creationDate: '',
        reviewerComment: '',
        reviewedDate: '',
    },
};

const employeeStore = create<State & Actions>(set => ({
    ...initialState,
    setLeaveRequestByID: async (requestID: number) => {
        const res = await getHttpLeaveRequestByID(requestID);
        const request: LeaveRequestByID = res[0];
        set(state => ({
            ...state,
            employeeRequest: {
                ...state.employeeRequest,
                ...request,
            },
        }));
    },
    setLeaveRequest: managerRequest => {
        set(state => ({
            ...state,
            employeeRequest: {
                ...state.employeeRequest,
                ...managerRequest,
            },
        }));
    },
}));

export default employeeStore;
