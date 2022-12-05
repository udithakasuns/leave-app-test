import React from 'react';
import { Button, Spacer, Text } from 'src/components/atoms';
import {
    MoreDetailsButton,
    RequestDetailsSection,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onPressViewMoreDetails: () => void;
    onPressRevokeLeave: () => void;
}

const { colors, scale } = theme;

const ApprovedLeaveSheetBody = ({
    requestDetails,
    onPressViewMoreDetails,
    onPressRevokeLeave,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        <Spacer height={5} />
        <Text color={colors.gray700}>
            Your leave request has been approved and if you want to revoke your
            leave, please press revoke.
        </Text>
        {requestDetails && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isStatusVisible
                isDurationVisible
            />
        )}
        <Spacer height={1} />
        <MoreDetailsButton onPress={onPressViewMoreDetails} />
        <Spacer />
        <Button
            mode='outlined-error'
            icon='close'
            label='Revoke Leave'
            onPress={onPressRevokeLeave}
            labelStyle={{ paddingHorizontal: scale.sc4 }}
        />
        <Spacer height={10} />
    </>
);
export default ApprovedLeaveSheetBody;
