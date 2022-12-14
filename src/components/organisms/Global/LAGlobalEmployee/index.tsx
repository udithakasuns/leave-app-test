/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { LAEmployeeModals, LAEmployeePopUp } from 'src/components/organisms';
import { LAEmployeeModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { LAEmployeePopUpProps } from 'src/components/organisms/EmployeeHome/LAEmployeePopUp';
import {
    deleteHttpApplyLeave,
    getHttpNudgeVisibility,
    postHttpNudge,
} from 'src/services/http';
import { patchHttpApplyLeave } from 'src/services/http/patchRequest';
import {
    useEmployeeFilterStore,
    useEmployeeStore,
    useRecipientStore,
} from 'src/store';
import { showErrorToast, toastConfig } from 'src/utils/alerts';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import {
    EmployeeModal,
    FilterTypes,
    LeaveRequestType,
    LeaveUndoProp,
    Section,
} from 'src/utils/types';

import { handleAlreadyNudgeError } from './helpers/errorHandlers';
import {
    handleDateModal,
    handleRequestSelectedModal,
} from './helpers/modalHandlers';
import {
    handleDeleteSuccess,
    handleFilterTypesSuccess,
    handleLeaveRequestSuccess,
    handleNudgeSuccess,
    handleUndoCancellationSuccess,
} from './helpers/successHandlers';

const LAGlobalEmployee = () => {
    const [employeeModal, setEmployeeModal] = useState<LAEmployeeModalProps>();
    const [employeePopup, setEmployeePopup] = useState<LAEmployeePopUpProps>();

    const {
        params,
        setFilterChips,
        filterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useEmployeeFilterStore();

    const { employeeRequest, setEmployeeRequest, getEmployeeModal } =
        useEmployeeStore();

    const { managers } = useRecipientStore();

    const {
        refetch: filterRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData(
        true,
        (data: FilterTypes[]) =>
            handleFilterTypesSuccess(data, filterChips, setFilterChips),
    );

    const { refetch }: UseQueryResult<Section<LeaveRequestType[]>[]> =
        useLeaveRequestData(
            params,
            true,
            (data: Section<LeaveRequestType[]>[]) =>
                handleLeaveRequestSuccess(
                    data,
                    setEmptyFilterUtils,
                    resetFilterUtils,
                ),
        );

    const { mutate: undoCancellationMutate } = useMutation(
        ['undoCancellation'],
        patchHttpApplyLeave,
        {
            onSuccess: () => handleUndoCancellationSuccess(refetchAllData),
            onError: () => {
                showErrorToast(ErrorCodes.ERROR_OCCURRED);
            },
        },
    );

    const { mutate: deleteMutate } = useMutation(
        ['applyLeaveDelete'],
        deleteHttpApplyLeave,
        {
            onSuccess: () =>
                handleDeleteSuccess(
                    employeeModal?.modalType,
                    employeeRequest,
                    employeeModal,
                    setEmployeeRequest,
                    setEmployeeModal,
                    setEmployeePopup,
                    refetchAllData,
                ),
        },
    );

    const { mutate: nudgeMutate } = useMutation(
        ['nudgeManger'],
        postHttpNudge,
        {
            onSuccess: () =>
                handleNudgeSuccess(setEmployeeModal, managers[0].name ?? ''),
        },
    );

    const { mutate: nudgeVisibilityMutate } = useMutation(
        ['nudgeVisibilityManger'],
        getHttpNudgeVisibility,
        {
            onSuccess: (data: any) => {
                const isAlreadyNudge = data[0].nudge;
                setEmployeeModal({
                    ...employeeModal,
                    modalType: EmployeeModal.PENDING_LEAVE_MODAL,
                    isNudgeVisble: !isAlreadyNudge,
                });
            },
        },
    );

    const handleDateModalPress = () =>
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.CHOSE_DATE_MODAL,
        });

    const handleDateModalBackPress = (modalType: EmployeeModal) => {
        setEmployeeModal({
            ...employeeModal,
            modalType: handleDateModal(modalType),
        });
    };

    const handleNudgeManager = () => {
        if (employeeModal?.isNudgeVisble) {
            if (employeeRequest.leaveRequestId) {
                nudgeMutate(employeeRequest.leaveRequestId);
            }
        } else {
            handleAlreadyNudgeError();
        }
    };
    const handleViewMoreDetails = (onBackPressModal: EmployeeModal) => {
        setEmployeeModal({
            ...employeeModal,
            onBackPressType: onBackPressModal,
            modalType: EmployeeModal.LEAVE_INFORMATION,
        });
    };

    const refetchAllData = () => {
        refetch();
        filterRefetch();
    };

    const onOpenModal = () => {
        getEmployeeModal(employeeRequest.leaveRequestId);
        const selectedModalType = handleRequestSelectedModal(employeeRequest);
        if (selectedModalType === EmployeeModal.PENDING_LEAVE_MODAL) {
            nudgeVisibilityMutate(employeeRequest.leaveRequestId);
            return;
        }
        setEmployeeModal({
            modalType: selectedModalType,
        });
    };

    useEffect(() => {
        onOpenModal();
    }, [employeeRequest.leaveRequestId]);

    return (
        <>
            <LAEmployeeModals
                isNudgeVisble={employeeModal?.isNudgeVisble}
                modalType={employeeModal?.modalType}
                onBackPressType={employeeModal?.onBackPressType}
                onClose={() => setEmployeeModal(undefined)}
                formik={undefined}
                onPressSelectDate={handleDateModalPress}
                onBackPress={handleDateModalBackPress}
                onPressNudge={handleNudgeManager}
                onPressLeaveInformation={handleViewMoreDetails}
                onPressCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: undefined,
                    });
                    deleteMutate(employeeRequest.leaveRequestId);
                }}
                onNavigateToCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: EmployeeModal.CANCEL_REQUEST_MODAL,
                    });
                }}
                onPressRevokeLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: EmployeeModal.REVOKE_REQUEST_MODAL,
                    });
                }}
                onRevokeLeaveRequest={(revokeComment: string) => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: undefined,
                    });
                    // TODO:  Make API Call for Revoke Request
                }}
            />
            <LAEmployeePopUp
                modalType={employeePopup?.modalType}
                onClose={() => setEmployeePopup(undefined)}
                requestDetails={employeePopup?.requestDetails}
                onConfirmationUndoPress={() => {
                    setEmployeePopup(undefined);
                    deleteMutate(employeeRequest.leaveRequestId);
                }}
                onConfirmationHomePress={() => {
                    setEmployeePopup(undefined);
                    refetch();
                }}
                onCancellationUndoPress={() => {
                    const values: Partial<LeaveUndoProp> = {
                        requestID: employeeRequest.leaveRequestId,
                        startDate: employeeRequest?.startDate,
                        endDate: employeeRequest?.endDate,
                        leaveRequestStatus: 'PENDING',
                    };
                    setEmployeePopup({ modalType: undefined });
                    undoCancellationMutate(values);
                }}
            />
            {employeeModal?.modalType === undefined && (
                <Toast
                    config={toastConfig}
                    position='bottom'
                    bottomOffset={30}
                    autoHide
                />
            )}
        </>
    );
};

export default LAGlobalEmployee;
