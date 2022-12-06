import React from 'react';
import { Button, Spacer, Text } from 'src/components/atoms';
import { RequestDetailsSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onPressCancelLeave: () => void;
}

const { colors, scale } = theme;

const CancelLeaveSheetBody = ({
    requestDetails,
    onPressCancelLeave,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        <Spacer height={5} />
        <Text color={colors.gray700}>
            Consider contacting your supervisor and explaining the reason for
            cancellation as well.
        </Text>
        {requestDetails && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isStatusVisible
                isDurationVisible
            />
        )}
        <Spacer />
        <Button
            mode='outlined-error'
            label='Cancel Leave'
            icon='close'
            onPress={onPressCancelLeave}
            labelStyle={{ paddingHorizontal: scale.sc4 }}
        />
        <Spacer height={10} />
    </>
);
export default CancelLeaveSheetBody;
