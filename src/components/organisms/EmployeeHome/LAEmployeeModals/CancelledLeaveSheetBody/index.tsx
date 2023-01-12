import React from 'react';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import { RequestDetailsSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onClose: () => void;
}

const { colors, scale } = theme;

const CancelledLeaveSheetBody = ({
    requestDetails,
    onClose,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        <Spacer height={5} />
        {requestDetails?.leaveRequest?.status === 'CANCELLED' && (
            <Text color={colors.gray700}>
                You have cancelled this leave request.
            </Text>
        )}
        {requestDetails && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isStatusVisible
                isRecipientVisible
                isDurationVisible
            />
        )}
        <Input
            placeholder={requestDetails?.leaveRequest?.reviewerComment ?? ''}
            label={
                requestDetails?.leaveRequest?.status === 'REVOKED'
                    ? 'Reviewer comment'
                    : 'Reason'
            }
            type='COMMENT'
            containerStyle={{ margin: 0 }}
            inputContainerStyle={{ paddingVertical: scale.sc8 }}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
        <Button
            iconPosition='left'
            label='Proceed to home'
            onPress={onClose}
            icon='arrow-forward'
        />
        <Spacer height={10} />
    </>
);
export default CancelledLeaveSheetBody;
