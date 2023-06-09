import React, { useState, useEffect } from 'react';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import {
    FilterTypes,
    ManagerModal,
    ManagerPopup,
    Page,
    PendingRequestByID,
    PendingRequestType,
    Status,
} from 'src/utils/types';
import { usePendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import { AxiosError } from 'axios';
import { MultiChipProps } from 'src/components/molecules';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { patchHttpManagerLeave } from 'src/services/http/patchRequest';
import { ModalLoader } from 'src/components/atoms';
import { useQueryManagerTeams } from 'src/utils/query/TeamAvailablity';
import LAManagerModals, {
    LAManagerModalProps,
} from '../../ManagerHome/LAManagerModals';
import LAManagerPopUp, {
    LAManagerPopUpProps,
} from '../../ManagerHome/LAManagerPopUp';

const LAGlobalManager = () => {
    const [managerModal, setManagerModal] = useState<LAManagerModalProps>();
    const [managerPopup, setManagerPopup] = useState<LAManagerPopUpProps>();
    const {
        managerRequest,
        setManagerRequest,
        isManagerModalLoading,
        resetManagerRequest,
    } = useManagerStore();
    const {
        params,
        filterChips,
        setFilterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useManagerFilterStore();

    const {
        refetch: refetchLeaveRequests,
    }: UseQueryResult<Page<PendingRequestType[]>> = usePendingRequestData(
        params,
        (data: Page<PendingRequestType[]>) => {
            if (
                data === undefined ||
                data?.items === undefined ||
                data?.items?.length === 0 ||
                data === undefined
            ) {
                setEmptyFilterUtils();
            } else {
                resetFilterUtils();
            }
        },
    );

    const {
        refetch: statusTypesRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData(
        false,
        (data: FilterTypes[]) => {
            const chipProps: MultiChipProps[] = data.map(
                (item): MultiChipProps => ({
                    chipId: item.typeId,
                    content: item.name,
                }),
            );
            const tempFilterChips = filterChips.filter(item => item.id !== 2);
            if (chipProps.length > 0)
                setFilterChips([
                    ...tempFilterChips,
                    {
                        id: 2,
                        title: 'Leave Type',
                        chips: chipProps,
                    },
                ]);
        },
    );

    const { onRefetchManagerTeams } = useQueryManagerTeams({
        enableQuery: false,
    });

    const { mutate: updateLeaveMutate } = useMutation(
        ['updateLeave'],
        patchHttpManagerLeave,
        {
            onSuccess: (data: any, { previousStatus }) => {
                const leaveData: PendingRequestByID = data[0];
                setManagerRequest(leaveData);
                onRefetchManagerTeams();
                refetchLeaveRequests();
                statusTypesRefetch();
                switch (leaveData.status) {
                    case Status.APPROVED:
                        if (previousStatus === Status.REVOKED) {
                            setManagerPopup({
                                modalType:
                                    ManagerPopup.LEAVE_REQUEST_REVOKE_UNDO,
                            });
                        } else {
                            setManagerPopup({
                                modalType: ManagerPopup.LEAVE_REQUEST_APPROVED,
                            });
                        }
                        break;
                    case Status.DENIED:
                        setManagerPopup({
                            modalType: ManagerPopup.LEAVE_REQUEST_DECLINE,
                        });
                        break;
                    case Status.PENDING:
                        setManagerPopup({
                            modalType: undefined,
                        });
                        setManagerModal({
                            modalType: ManagerModal.PENDING_LEAVE_MODAL,
                        });
                        break;
                    case Status.REVOKED:
                        setManagerPopup({
                            modalType: ManagerPopup.LEAVE_REQUEST_REVOKE,
                        });
                        break;
                    default:
                        break;
                }
            },
        },
    );

    const onOpenModalByStatus = () => {
        let selectedModal: ManagerModal | undefined;
        switch (managerRequest.status) {
            case 'PENDING':
                selectedModal = ManagerModal.PENDING_LEAVE_MODAL;
                break;
            case 'APPROVED':
                selectedModal = ManagerModal.APPROVED_LEAVE_MODAL;
                break;
            case 'DENIED':
                selectedModal = ManagerModal.DENIED_LEAVE_MODAL;
                break;
            case 'CANCELLED':
            case 'REVOKED':
                selectedModal = ManagerModal.CANCELLED_LEAVE_MODAL;
                break;
            default:
                break;
        }
        setManagerModal({ modalType: selectedModal });
    };

    useEffect(() => {
        if (!isManagerModalLoading && managerRequest) {
            onOpenModalByStatus();
        }
    }, [isManagerModalLoading]);

    const onCloseManagerModal = () => {
        setManagerModal({ modalType: undefined });
        resetManagerRequest();
    };

    const onClosePopup = () => {
        setManagerPopup({ modalType: undefined });
        resetManagerRequest();
    };

    if (isManagerModalLoading) {
        return <ModalLoader />;
    }

    return (
        <>
            <LAManagerModals
                onClose={onCloseManagerModal}
                modalType={managerModal?.modalType}
                onBackPressType={managerModal?.onBackPressType}
                onPressApproveLeave={() => {
                    setManagerModal({ modalType: undefined });
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.APPROVED,
                    });
                }}
                onPressDeclineLeave={() => {
                    setManagerModal({
                        modalType: ManagerModal.DECLINE_LEAVE_MODAL,
                    });
                }}
                onPressLeaveInformation={(onBackPressType: ManagerModal) => {
                    setManagerModal({
                        modalType: ManagerModal.LEAVE_INFORMATION,
                        onBackPressType,
                    });
                }}
                onBackPress={(modalType: ManagerModal) => {
                    setManagerModal(state => ({
                        ...state,
                        modalType,
                    }));
                }}
                onDeclineLeaveRequest={(reviewerComment: string) => {
                    setManagerModal({ modalType: undefined });
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.DENIED,
                        reviewerComment,
                    });
                }}
                onRevokeLeaveRequest={(reviewerComment: string) => {
                    setManagerModal({ modalType: undefined });
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.REVOKED,
                        reviewerComment,
                    });
                }}
                onPressRevokeLeave={() => {
                    setManagerModal({
                        modalType: ManagerModal.REVOKE_LEAVE_MODAL,
                    });
                }}
            />
            <LAManagerPopUp
                modalType={managerPopup?.modalType}
                onClose={onClosePopup}
                onUndoApprovalPress={() => {
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.PENDING,
                    });
                }}
                onUndoRevokePress={() => {
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.APPROVED,
                        previousStatus: Status.REVOKED,
                    });
                }}
            />
        </>
    );
};

export default LAGlobalManager;
