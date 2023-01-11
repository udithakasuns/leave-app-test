import React from 'react';
import { PopUp } from 'src/components/molecules';
import { useManagerStore } from 'src/store';
import { ManagerPopup, TestProps } from 'src/utils/types';
import LeaveApprovedSheetBody from './LeaveApprovedSheetBody';
import LeaveDeclinedPopUp from './LeaveDeclinedPopUp';
import LeaveRevokePopUp from './LeaveRevokePopUp';
import LeaveRevokeUndoPopUp from './LeaveRevokeUndoPopUp';
import { styles } from './styles';

export type PopUpProps = {
    modalType: ManagerPopup;
};

export type LAManagerPopUpProps = Partial<PopUpProps>;

interface Props extends Partial<TestProps>, LAManagerPopUpProps {
    onClose: () => void;
    onUndoApprovalPress: () => void;
    onUndoRevokePress: () => void;
}

const LAManagerPopUp = ({
    modalType,
    onClose,
    onUndoApprovalPress,
    onUndoRevokePress,
}: Props) => {
    const { managerRequest } = useManagerStore();
    return (
        <>
            {modalType === ManagerPopup.LEAVE_REQUEST_APPROVED && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    defaultHeader={{
                        title: 'Leave request approved',
                        subTitle:
                            'The leave request of your team member was successfully approved.',
                    }}
                    bodyStyle={styles.containerStyle}
                    bodyChildren={
                        <LeaveApprovedSheetBody
                            onConfirmationHomePress={onClose}
                            onUndoApprovalPress={onUndoApprovalPress}
                            requestDetails={managerRequest}
                        />
                    }
                />
            )}
            {modalType === ManagerPopup.LEAVE_REQUEST_DECLINE && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    defaultHeader={{
                        title: 'Leave request denied',
                        subTitle:
                            ' The leave request of your team member was succesfully denied.',
                    }}
                    bodyChildren={
                        <LeaveDeclinedPopUp
                            onConfirmationHomePress={onClose}
                            onUndoApprovalPress={onUndoApprovalPress}
                            requestDetails={managerRequest}
                        />
                    }
                />
            )}
            {modalType === ManagerPopup.LEAVE_REQUEST_REVOKE && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    defaultHeader={{
                        title: 'Leave revoked',
                        subTitle:
                            ' Approved leave request has been revoked successfully. The leave allocation will be updated.',
                    }}
                    bodyChildren={
                        <LeaveRevokePopUp
                            onConfirmationHomePress={onClose}
                            onUndoRevokePress={onUndoRevokePress}
                            requestDetails={managerRequest}
                        />
                    }
                />
            )}
            {modalType === ManagerPopup.LEAVE_REQUEST_REVOKE_UNDO && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    defaultHeader={{
                        title: 'Revoke request undone',
                        subTitle:
                            ' Your request to revoke the leave was successfully undone.',
                    }}
                    bodyChildren={
                        <LeaveRevokeUndoPopUp
                            onConfirmationHomePress={onClose}
                            requestDetails={managerRequest}
                        />
                    }
                />
            )}
        </>
    );
};
export default LAManagerPopUp;
