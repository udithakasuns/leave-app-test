import React from 'react';
import { ButtonDock, ManagerRequestDetails } from 'src/components/molecules';
import { PendingRequestByID, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    onUndoRevokePress: () => void;
    onConfirmationHomePress: () => void;
    requestDetails: PendingRequestByID;
}

const LeaveRevokeSheetBody = ({
    onUndoRevokePress,
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
                label: 'Undo Revoke',
                icon: 'undo',
                onPress: onUndoRevokePress,
            }}
        />
    </>
);
export default LeaveRevokeSheetBody;
