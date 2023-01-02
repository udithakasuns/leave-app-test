import { LeaveRequestByID } from 'src/utils/types';

export const employeeRequestDefault: LeaveRequestByID = {
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
};
