import { LeaveType } from '../types';

export const getLeaveUnicode = (leaveType: LeaveType) => {
    switch (leaveType.typeId) {
        case 1:
            return '📅';
        case 2:
            return '🌴';
        case 3:
            return '🌡';
        case 4:
            return '👶🏼';
        case 5:
            return '🎓';
        case 6:
            return '📝';
        default:
            return '';
    }
};

export const getLeaveName = (leaveType: LeaveType) => {
    switch (leaveType.typeId) {
        case 1:
            return 'Annual';
        case 2:
            return 'Casual';
        case 3:
            return 'Medical';
        default:
            return '';
    }
};

export const getEntitlementChipText = (leaveType: LeaveType, name: string) =>
    `${getLeaveUnicode(leaveType)}  ${
        name === '' ? getLeaveName(leaveType) : name
    }`;
