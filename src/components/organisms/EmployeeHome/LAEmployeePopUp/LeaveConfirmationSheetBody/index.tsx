import React from 'react';
import { ButtonDock } from 'src/components/molecules';
import LARequestDetailsSection from 'src/components/molecules/LAEmployeeRequestDetails';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    onConfirmationUndoPress: () => void;
    onConfirmationHomePress: () => void;
    requestDetails: RequestDetails;
}

const LeaveConfirmationSheetBody = ({
    onConfirmationUndoPress,
    onConfirmationHomePress,
    requestDetails,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        {requestDetails && (
            <LARequestDetailsSection
                requestDetails={requestDetails}
                isStatusVisible={false}
            />
        )}
        <ButtonDock
            iconPosition='left'
            primaryButton={{
                label: 'Back to home',
                icon: 'arrow-forward',
                onPress: onConfirmationHomePress,
            }}
            secondaryButton={{
                label: 'Undo request',
                icon: 'undo',
                onPress: onConfirmationUndoPress,
            }}
        />
    </>
);
export default LeaveConfirmationSheetBody;
