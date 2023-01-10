/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Modal } from 'src/components/molecules';
import { useManagerStore } from 'src/store';
import { getCalendarDate } from 'src/utils/helpers/dateHandler';
import { ManagerModal, TestProps } from 'src/utils/types';
import ApproveSheetBody from './ApprovalSheetBody';
import ApprovedSheetBody from './ApprovedSheetBody';
import CancelledSheetBody from './CancelledSheetBody';
import DeclineSheetBody from './DeclineSheetBody';
import DeniedSheetBody from './DeniedSheetBody';
import LeaveInformationSheetBody from './LeaveInformationSheetBody';
import RevokeLeaveSheetBody from './RevokeLeaveSheetBody';
import { styles } from './styles';

export type ModalProps = {
    modalType: ManagerModal;
    onBackPressType: ManagerModal;
};

export type LAManagerModalProps = Partial<ModalProps>;

interface Props extends Partial<TestProps>, LAManagerModalProps {
    onClose: () => void;
    onPressApproveLeave: () => void;
    onPressDeclineLeave: () => void;
    onPressLeaveInformation: (onBackPressModal: ManagerModal) => void;
    onBackPress: (modalType: ManagerModal) => void;
    onDeclineLeaveRequest: (reviewerComment: string) => void;
    onPressRevokeLeave: () => void;
    onRevokeLeaveRequest: (reviewerComment: string) => void;
}

const LAManagerModals = ({
    modalType,
    onBackPressType,
    onClose,
    onPressApproveLeave,
    onPressDeclineLeave,
    onPressLeaveInformation,
    onBackPress,
    onDeclineLeaveRequest,
    onPressRevokeLeave,
    onRevokeLeaveRequest,
}: Props) => {
    const { managerRequest } = useManagerStore();

    return (
        <>
            {modalType === ManagerModal.PENDING_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Approve Leave'
                    style={styles.commonStyle}
                    sheetBody={
                        <ApproveSheetBody
                            requestDetails={managerRequest}
                            onPressApproveLeave={onPressApproveLeave}
                            onPressDeclineLeave={onPressDeclineLeave}
                        />
                    }
                />
            )}
            {modalType === ManagerModal.APPROVED_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Approved leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <ApprovedSheetBody
                            requestDetails={managerRequest}
                            onPressViewMoreDetails={() =>
                                onPressLeaveInformation(
                                    ManagerModal.APPROVED_LEAVE_MODAL,
                                )
                            }
                            onPressRevokeLeave={onPressRevokeLeave}
                            onPressBackToHome={onClose}
                        />
                    }
                />
            )}
            {modalType === ManagerModal.DENIED_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Denied leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <DeniedSheetBody
                            requestDetails={managerRequest}
                            onPressBackToHome={onClose}
                            onPressLeaveInformation={() =>
                                onPressLeaveInformation(
                                    ManagerModal.DENIED_LEAVE_MODAL,
                                )
                            }
                        />
                    }
                />
            )}
            {modalType === ManagerModal.LEAVE_INFORMATION && (
                <Modal
                    onClose={() => {
                        onBackPress(
                            onBackPressType ??
                                ManagerModal.APPROVED_LEAVE_MODAL,
                        );
                    }}
                    isVisible
                    header='Leave Information'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <LeaveInformationSheetBody
                            dateApplied={getCalendarDate(
                                managerRequest.creationDate,
                            )}
                            dateApproved={getCalendarDate(
                                managerRequest.reviewedDate,
                            )}
                            requestDescription={managerRequest.requestDesc}
                            reviewedDateLabel={
                                onBackPressType ===
                                ManagerModal.APPROVED_LEAVE_MODAL
                                    ? 'Date Approved'
                                    : 'Date Denied'
                            }
                        />
                    }
                />
            )}
            {modalType === ManagerModal.DECLINE_LEAVE_MODAL && (
                <Modal
                    onClose={() => {
                        onBackPress(ManagerModal.PENDING_LEAVE_MODAL);
                    }}
                    isVisible
                    header='Decline Leave'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <DeclineSheetBody
                            onDeclineLeaveRequest={onDeclineLeaveRequest}
                        />
                    }
                />
            )}
            {modalType === ManagerModal.CANCELLED_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Cancelled leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <CancelledSheetBody
                            requestDetails={managerRequest}
                            onPressBackToHome={onClose}
                        />
                    }
                />
            )}
            {modalType === ManagerModal.REVOKE_LEAVE_MODAL && (
                <Modal
                    onClose={() => {
                        onBackPress(ManagerModal.APPROVED_LEAVE_MODAL);
                    }}
                    isVisible
                    header='Revoke approved leave'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <RevokeLeaveSheetBody
                            onRevokeLeaveRequest={onRevokeLeaveRequest}
                        />
                    }
                />
            )}
        </>
    );
};
export default LAManagerModals;
