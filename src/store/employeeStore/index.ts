import { LeaveRequestByID } from 'src/utils/types';
import { create } from 'zustand';
import { getHttpLeaveRequestByID } from '../../services/http/getRequest/index';
import { Actions, State } from './types';

export const initialState: State = {
    refreshEmployeeHomeState: false,
    isEmployeeModalLoading: false,
    employeeRequest: {
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

const employeeStore = create<State & Actions>(set => ({
    ...initialState,
    setRefreshEmployeeHomeState: refreshEmployeeHomeState =>
        set(() => ({ refreshEmployeeHomeState })),
    getEmployeeModal: async (requestID: number) => {
        set({
            isEmployeeModalLoading: true,
        });
        try {
            const res = await getHttpLeaveRequestByID(requestID);
            const request: LeaveRequestByID = res[0];
            set(state => ({
                employeeRequest: {
                    ...state.employeeRequest,
                    ...request,
                },
                isEmployeeModalLoading: false,
            }));
        } catch (err) {
            set({
                isEmployeeModalLoading: false,
            });
        }
    },
    setEmployeeRequest: managerRequest => {
        set(state => ({
            ...state,
            employeeRequest: {
                ...state.employeeRequest,
                ...managerRequest,
            },
        }));
    },
    resetEmployeeRequest: () => {
        set(() => ({
            employeeRequest: initialState.employeeRequest,
        }));
    },
}));

export default employeeStore;
