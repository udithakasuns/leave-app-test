import React from 'react';
import { Input, Spacer } from 'src/components/atoms';
import { LeaveInformationSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDescription: string;
}

const { colors } = theme;

const LeaveInformationSheetBody = ({
    requestDescription,
}: PartialBy<Props, 'requestDescription'>) => (
    <>
        <Spacer height={5} />
        <LeaveInformationSection
            leaveInfo={[
                {
                    infoId: 1,
                    label: 'Date Applied',
                    element: '12th Jan',
                },
            ]}
        />
        <Spacer height={2} />
        <Input
            placeholder={requestDescription ?? ''}
            label='Reason'
            type='COMMENT'
            containerStyle={{ margin: 0 }}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
    </>
);
export default LeaveInformationSheetBody;
