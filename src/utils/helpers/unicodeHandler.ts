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
