import { MultiChipProps } from 'src/components/molecules';
import { ModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { PopUpProps } from 'src/components/organisms/EmployeeHome/LAEmployeePopUp';
import { showSuccessToast } from 'src/utils/alerts';
import { SuccessCodes } from 'src/utils/helpers/successCodes';
import {
    EmployeeModal,
    EmployeePopup,
    FilterChipsProps,
    FilterTypes,
    LeaveRequestByID,
    LeaveRequestType,
    Section,
} from 'src/utils/types';

export const handleOnFilterTypesSuccess = (
    data: FilterTypes[],
    filterChips: FilterChipsProps[],
    setFilterChips: (filterChips: FilterChipsProps[]) => void,
) => {
    const chipProps: MultiChipProps[] = data.map(
        (item): MultiChipProps => ({
            chipId: item.typeId,
            content: item.name,
        }),
    );
    const tempFilterChips = filterChips.filter(item => item.id !== 2);
    setFilterChips([
        ...tempFilterChips,
        {
            id: 2,
            title: 'Leave Type',
            chips: chipProps,
        },
    ]);
};

export const handleOnLeaveRequestSuccess = (
    data: Section<LeaveRequestType[]>[],
    setEmptyFilterUtils: () => void,
    resetFilterUtils: () => void,
) => {
    if (data?.length === 0 || data === undefined) {
        setEmptyFilterUtils();
    } else {
        resetFilterUtils();
    }
};

export const handleOnUndoCancellationSuccess = (refetchAllData: () => void) => {
    showSuccessToast(SuccessCodes.CANCELLATION_UNDONE);
    refetchAllData();
};

export const handleOnDeleteSuccess = (
    modalType: EmployeeModal | undefined,
    employeeRequest: LeaveRequestByID,
    employeeModal: Partial<ModalProps> | undefined,
    setLeaveRequest: (managerRequest: LeaveRequestByID) => void,
    setEmployeeModal: (
        value: React.SetStateAction<Partial<ModalProps> | undefined>,
    ) => void,
    setEmployeePopup: (
        value: React.SetStateAction<Partial<PopUpProps> | undefined>,
    ) => void,
    refetchAllData: () => void,
) => {
    if (modalType === EmployeeModal.CANCEL_REQUEST_MODAL) {
        setLeaveRequest({
            ...employeeRequest,
            status: 'CANCELLED',
        });
        setEmployeeModal({
            modalType: undefined,
        });
        setEmployeePopup({
            modalType: EmployeePopup.LEAVE_REQUEST_CANCELLED,
        });
    } else {
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.APPLY_LEAVE_MODAL,
        });
    }

    refetchAllData();
};

export const handleOnNudgeSuccess = (
    setEmployeeModal: (
        value: React.SetStateAction<Partial<ModalProps> | undefined>,
    ) => void,
    managerName: string,
) => {
    setEmployeeModal({ modalType: undefined });
    showSuccessToast(SuccessCodes.NUDGED_SUPERVISOR, managerName);
};

export const handleApplyMutationSuccess = (
    data: any,
    setEmployeeModal: (
        value: React.SetStateAction<Partial<ModalProps> | undefined>,
    ) => void,
    setLeaveRequestByID: (requestedId: number) => void,
    setEmployeePopup: (
        value: React.SetStateAction<Partial<PopUpProps> | undefined>,
    ) => void,
    refetchAllData: () => void,
) => {
    setEmployeeModal({
        modalType: undefined,
    });
    const tempLeave: LeaveRequestByID = data[0];
    setLeaveRequestByID(tempLeave.leaveRequestId);
    setEmployeePopup({
        modalType: EmployeePopup.LEAVE_REQUEST_CONFIRMATION,
    });
    refetchAllData();
};
