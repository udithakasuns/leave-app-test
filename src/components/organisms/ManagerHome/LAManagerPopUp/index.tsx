import React from 'react';
import { PopUp } from 'src/components/molecules';
import { useManagerStore } from 'src/store';
import { ManagerPopup, TestProps } from 'src/utils/types';
import LeaveApprovedSheetBody from './LeaveApprovedSheetBody';
import LeaveDeclinedPopUp from './LeaveDeclinedPopUp';
import { styles } from './styles';

export type PopUpProps = {
    modalType: ManagerPopup;
};

export type LAManagerPopUpProps = Partial<PopUpProps>;

interface Props extends Partial<TestProps>, LAManagerPopUpProps {
    onClose: () => void;
    onUndoApprovalPress: () => void;
}

const LAManagerPopUp = ({ modalType, onClose, onUndoApprovalPress }: Props) => {
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
        </>
    );
};
export default LAManagerPopUp;
