import React from 'react';
import { ManagerRequestDetails } from 'src/components/molecules';
import { PendingRequestByID, TestProps } from 'src/utils/types';
import { Button } from '../../../../atoms';

interface Props extends Partial<TestProps> {
    onConfirmationHomePress: () => void;
    requestDetails: PendingRequestByID;
}

const LeaveRevokeUndoSheetBody = ({
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
        <Button
            icon='arrow-forward'
            label='Proceed to home'
            onPress={onConfirmationHomePress}
            labelStyle={{ paddingHorizontal: 4 }}
        />
    </>
);
export default LeaveRevokeUndoSheetBody;
