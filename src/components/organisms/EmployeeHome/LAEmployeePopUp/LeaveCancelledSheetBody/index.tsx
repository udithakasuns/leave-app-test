import React from 'react';
import { ButtonDock } from 'src/components/molecules';
import LARequestDetailsSection from 'src/components/molecules/LAEmployeeRequestDetails';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    onCancellationUndoPress: () => void;
    onConfirmationHomePress: () => void;
    requestDetails: RequestDetails;
}

const LeaveCancelledSheetBody = ({
    onCancellationUndoPress,
    onConfirmationHomePress,
    requestDetails,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        {requestDetails && (
            <LARequestDetailsSection
                requestDetails={requestDetails}
                isRecipientVisible={false}
            />
        )}
        <ButtonDock
            iconPosition='left'
            primaryButton={{
                label: 'Proceed to home',
                icon: 'arrow-forward',
                onPress: onConfirmationHomePress,
            }}
            secondaryButton={{
                label: 'Undo cancellation',
                icon: 'close',
                onPress: onCancellationUndoPress,
            }}
        />
    </>
);
export default LeaveCancelledSheetBody;
