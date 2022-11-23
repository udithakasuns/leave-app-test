import React from 'react';
import { Button, Divider, Spacer, Text } from 'src/components/atoms';
import {
    ButtonDock,
    RequestDetailsSection,
    SelectionButton,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onPressViewMoreDetails: () => void;
    onPressNudge: (isDisable: boolean) => void;
    onPressCancelLeave: () => void;
}

const { colors } = theme;

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
            />
        )}
        <Spacer />
        <Button
            mode='outlined-error'
            label='Cancel Leave'
            onPress={onPressCancelLeave}
        />
        <Spacer height={10} />
    </>
);
export default CancelLeaveSheetBody;
