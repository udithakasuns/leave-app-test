import React from 'react';
import { Input, Spacer } from 'src/components/atoms';
import { LeaveInformationSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDescription: string;
    dateApplied: string;
    dateApproved: string;
    reviewedDateLabel: string;
}

const { colors, scale } = theme;

const LeaveInformationSheetBody = ({
    requestDescription,
    dateApplied,
    dateApproved,
    reviewedDateLabel,
}: PartialBy<Props, 'requestDescription'>) => (
    <>
        <Spacer height={5} />
        <LeaveInformationSection
            leaveInfo={[
                {
                    infoId: 1,
                    label: 'Date Applied',
                    element: dateApplied,
                },
                {
                    infoId: 2,
                    label: reviewedDateLabel,
                    element: dateApproved,
                },
            ]}
        />
        <Spacer height={2} />
        <Input
            placeholder={requestDescription ?? ''}
            label='Reason'
            type='COMMENT'
            containerStyle={{ margin: 0 }}
            inputContainerStyle={{ paddingVertical: scale.sc10 }}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
    </>
);
export default LeaveInformationSheetBody;
