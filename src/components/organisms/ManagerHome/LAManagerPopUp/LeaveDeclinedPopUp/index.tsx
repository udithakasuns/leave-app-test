import React from 'react';
import { ButtonDock, ManagerRequestDetails } from 'src/components/molecules';
import { PendingRequestByID, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    onUndoApprovalPress: () => void;
    onConfirmationHomePress: () => void;
    requestDetails: PendingRequestByID;
}

const LeaveApprovedSheetBody = ({
    onUndoApprovalPress,
    onConfirmationHomePress,
    requestDetails,
}: Props) => (
    <>
        <ManagerRequestDetails
            requestDetails={requestDetails}
            isRecipientVisible={false}
            isStatusVisible
            isMemberVisible
        />
        <ButtonDock
            iconPosition='left'
            primaryButton={{
                label: 'Proceed to home',
                icon: 'arrow-forward',
                onPress: onConfirmationHomePress,
            }}
            secondaryButton={{
                label: 'Undo cancellation',
                icon: 'undo',
                onPress: onUndoApprovalPress,
            }}
        />
    </>
);
export default LeaveApprovedSheetBody;
