import React from 'react';
import { AvatarSize, Button, Spacer } from 'src/components/atoms';
import {
    AvatarChip,
    ManagerRequestDetails,
    MoreDetailsButton,
} from 'src/components/molecules';
import { PendingRequestByID, TestProps } from 'src/utils/types';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: PendingRequestByID;
    onPressViewMoreDetails: () => void;
    onPressBackToHome: () => void;
    onPressRevokeLeave: () => void;
}

const ApprovedSheetBody = ({
    requestDetails,
    onPressViewMoreDetails,
    onPressBackToHome,
    onPressRevokeLeave,
}: Props) => (
    <>
        <Spacer height={8} />
        <AvatarChip
            size={AvatarSize.large}
            label={requestDetails.employee.name ?? ''}
            source={{
                uri: requestDetails.employee.authPic ?? '',
            }}
            containerStyle={styles.containerStyle}
        />
        <ManagerRequestDetails
            requestDetails={requestDetails}
            isRecipientVisible
            isStatusVisible
        />
        <Spacer />
        <MoreDetailsButton onPress={onPressViewMoreDetails} />
        <Spacer />
        <Button
            mode='outlined-error'
            icon='close'
            label='Revoke Leave'
            onPress={onPressRevokeLeave}
            labelStyle={{ paddingHorizontal: 4 }}
        />
        <Spacer />
        <Button
            iconPosition='left'
            label='Proceed to home'
            onPress={onPressBackToHome}
            icon='arrow-forward'
        />

        <Spacer />
    </>
);
export default ApprovedSheetBody;
