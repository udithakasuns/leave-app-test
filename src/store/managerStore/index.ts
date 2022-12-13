import { getHttpPendingRequestByID } from 'src/services/http';
import { PendingRequestByID } from 'src/utils/types';
import create from 'zustand';
import { Actions, State } from './types';

const initialState: State = {
    managerRequest: {
        leaveRequestId: 0,
        startDate: '',
        endDate: '',
        leaveType: { name: '', typeId: 0 },
        status: '',
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

const managerStore = create<State & Actions>(set => ({
    ...initialState,
    getManagerModal: async (requestID: number) => {
        const res = await getHttpPendingRequestByID(requestID);
        const employee: PendingRequestByID = res[0];
        set(state => ({
            ...state,
            managerRequest: {
                ...state.managerRequest,
                ...employee,
            },
        }));
    },
    setManagerRequest: managerRequest => {
        set(state => ({
            ...state,
            managerRequest: {
                ...state.managerRequest,
                ...managerRequest,
            },
        }));
    },
}));

export default managerStore;
