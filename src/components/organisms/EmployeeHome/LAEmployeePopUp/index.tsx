import React from 'react';
import { PopUp } from 'src/components/molecules';
import { EmployeePopup, RequestDetails, TestProps } from 'src/utils/types';
import LeaveCancelledSheetBody from './LeaveCancelledSheetBody';
import LeaveConfirmationSheetBody from './LeaveConfirmationSheetBody';
import { styles } from './styles';

export type PopUpProps = {
    modalType: EmployeePopup;
    requestDetails: RequestDetails;
};

export type LAEmployeePopUpProps = Partial<PopUpProps>;

interface Props extends Partial<TestProps>, LAEmployeePopUpProps {
    onClose: () => void;
    onConfirmationUndoPress: () => void;
    onConfirmationHomePress: () => void;
    onCancellationUndoPress: () => void;
}

const LAEmployeePopUp = ({
    modalType,
    onClose,
    onConfirmationUndoPress,
    onConfirmationHomePress,
    onCancellationUndoPress,
    requestDetails,
}: Props) => (
    <>
        {modalType === EmployeePopup.LEAVE_REQUEST_CONFIRMATION && (
            <PopUp
                onClose={onConfirmationHomePress}
                modalVisible
                defaultHeader={{
                    title: 'Leave Request Confirmed',
                    subTitle:
                        'Your leave request is submitted, when the request is approved by your supervisor you will get a notification.',
                }}
                bodyStyle={styles.containerStyle}
                bodyChildren={
                    <LeaveConfirmationSheetBody
                        onConfirmationHomePress={onConfirmationHomePress}
                        onConfirmationUndoPress={onConfirmationUndoPress}
                        requestDetails={requestDetails}
                    />
                }
            />
        )}
        {modalType === EmployeePopup.LEAVE_REQUEST_CANCELLED && (
            <PopUp
                onClose={onClose}
                modalVisible
                defaultHeader={{
                    title: 'Leave request cancelled',
                    subTitle:
                        'Your leave request was cancelled and your supervisor was informed with your reason.',
                }}
                bodyChildren={
                    <LeaveCancelledSheetBody
                        onCancellationUndoPress={onCancellationUndoPress}
                        onConfirmationHomePress={onConfirmationHomePress}
                        requestDetails={requestDetails}
                    />
                }
            />
        )}
    </>
);
export default LAEmployeePopUp;
