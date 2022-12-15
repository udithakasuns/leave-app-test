import React from 'react';
import { Spacer, Text } from 'src/components/atoms';
import {
    ButtonDock,
    MoreDetailsButton,
    RequestDetailsSection,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    isNudgeVisble: boolean;
    requestDetails: RequestDetails;
    onPressViewMoreDetails: () => void;
    onPressNudge: (isDisable: boolean) => void;
    onPressCancelLeave: () => void;
}

const { colors } = theme;

const PendingSheetBody = ({
    requestDetails,
    isNudgeVisble,
    onPressViewMoreDetails,
    onPressNudge,
    onPressCancelLeave,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        <Spacer height={5} />
        <Text color={colors.gray700}>
            Your leave request is still pending approval from your supervisor to
            be booked. You can cancel your leave if you no longer want to. You
            can nudge your supervisor if you want to remind them again.
        </Text>
        {requestDetails && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isStatusVisible
            />
        )}
        <Spacer height={1} />
        <MoreDetailsButton onPress={onPressViewMoreDetails} />
        <Spacer />
        <ButtonDock
            primaryButton={{
                label: 'Nudge Supervisor',
                icon: 'notification',
                mode: isNudgeVisble ? 'outlined' : 'contained-gray',
                iconLibrary: 'svg',
                onPress: () => {
                    onPressNudge(isNudgeVisble);
                },
            }}
            secondaryButton={{
                label: 'Cancel Leave',
                mode: 'outlined-error',
                onPress: onPressCancelLeave,
            }}
        />
        <Spacer height={10} />
    </>
);
export default PendingSheetBody;
