import { getHttpPendingRequestByID } from 'src/services/http';
import { PendingRequestByID } from 'src/utils/types';
import { create } from 'zustand';
import { Actions, State } from './types';

const initialState: State = {
    isManagerModalLoading: false,
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
        set({ isManagerModalLoading: true });
        try {
            const res = await getHttpPendingRequestByID(requestID);
            const employee: PendingRequestByID = res[0];
            set(state => ({
                managerRequest: {
                    ...state.managerRequest,
                    ...employee,
                },
                isManagerModalLoading: false,
            }));
        } catch (err) {
            set({ isManagerModalLoading: false });
        }
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
    resetManagerRequest: () => {
        set(() => ({
            managerRequest: initialState.managerRequest,
        }));
    },
}));

export default managerStore;
