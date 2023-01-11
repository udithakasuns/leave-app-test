import { EmployeeModal, LeaveRequestType } from 'src/utils/types';

export const handleRequestSelectedModal = (
    item: LeaveRequestType,
): EmployeeModal | undefined => {
    let selectedModal: EmployeeModal | undefined;
    switch (item.status) {
        case 'PENDING':
            selectedModal = EmployeeModal.PENDING_LEAVE_MODAL;
            break;
        case 'APPROVED':
            selectedModal = EmployeeModal.APPROVED_LEAVE_MODAL;
            break;
        case 'DENIED':
            selectedModal = EmployeeModal.DENIED_LEAVE_MODAL;
            break;
        case 'CANCELLED':
        case 'REVOKED':
            selectedModal = EmployeeModal.CANCELLED_LEAVE_MODAL;
            break;
        default:
            break;
    }
    return selectedModal;
};

export const handleDateModal = (
    modalType: EmployeeModal,
): EmployeeModal | undefined => {
    let modal: EmployeeModal | undefined;
    switch (modalType) {
        case EmployeeModal.CHOSE_DATE_MODAL:
            modal = EmployeeModal.APPLY_LEAVE_MODAL;
            break;
        case EmployeeModal.PENDING_LEAVE_MODAL:
            modal = EmployeeModal.PENDING_LEAVE_MODAL;
            break;
        case EmployeeModal.APPROVED_LEAVE_MODAL:
            modal = EmployeeModal.APPROVED_LEAVE_MODAL;
            break;
        default:
            break;
    }
    return modal;
};
