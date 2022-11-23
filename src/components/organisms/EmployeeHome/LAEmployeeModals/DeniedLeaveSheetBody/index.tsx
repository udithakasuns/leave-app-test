import React from 'react';
import { Button, Divider, Input, Spacer } from 'src/components/atoms';
import { RequestDetailsSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onClose: () => void;
}

const { colors } = theme;

const DeniedLeaveSheetBody = ({
    requestDetails,
    onClose,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        {requestDetails && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isRecipientVisible={false}
            />
        )}
        <Input
            placeholder={requestDetails?.leaveRequest?.requestDesc ?? ''}
            label='Reason'
            type='COMMENT'
            containerStyle={{ margin: 0 }}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
        <Divider />
        <Spacer />
        <Input
            placeholder={requestDetails?.leaveRequest?.reviewerComment ?? ''}
            label='Reason for denial'
            type='COMMENT'
            containerStyle={{ margin: 0 }}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
        <Button
            iconPosition='left'
            label='Back to home'
            onPress={onClose}
            icon='arrow-forward'
        />
        <Spacer height={10} />
    </>
);
export default DeniedLeaveSheetBody;
