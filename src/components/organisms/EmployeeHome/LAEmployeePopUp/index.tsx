import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';
import { ButtonDock, PopUp } from 'src/components/molecules';
import LARequestDetailsSection from 'src/components/molecules/LARequestDetailsSection';
import { EmployeePopup, RequestDetails, TestProps } from 'src/utils/types';
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
}

const LAEmployeePopUp = ({
    modalType,
    onClose,
    onConfirmationUndoPress,
    onConfirmationHomePress,
    requestDetails,
}: Props) => (
    <>
        {modalType === EmployeePopup.LEAVE_REQUEST_CONFIRMATION && (
            <PopUp
                onClose={onClose}
                modalVisible
                defaultHeader={{
                    title: 'Leave Request Confirmed',
                    subTitle:
                        'Your leave request is submitted, when the request is approved by your supervisor you will get a notification.',
                }}
                bodyStyle={styles.containerStyle}
                bodyChildren={
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
                }
            />
        )}
        {modalType === EmployeePopup.LEAVE_REQUEST_REVOKE && (
            <PopUp
                onClose={onClose}
                modalVisible
                bodyChildren={
                    <View>
                        <Text>ss</Text>
                    </View>
                }
            />
        )}
    </>
);
export default LAEmployeePopUp;
