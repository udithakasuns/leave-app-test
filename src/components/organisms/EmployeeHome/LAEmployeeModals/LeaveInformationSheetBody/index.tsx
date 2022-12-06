import React from 'react';
import { Input, Spacer } from 'src/components/atoms';
import { LeaveInformationSection } from 'src/components/molecules';
import { getCalendarDate } from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { LeaveRequestByID, PartialBy, TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    requestDetails: LeaveRequestByID;
}

const { colors } = theme;

const LeaveInformationSheetBody = ({
    requestDetails,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        <Spacer height={5} />
        <LeaveInformationSection
            leaveInfo={
                requestDetails?.status === 'APPROVED'
                    ? [
                          {
                              infoId: 1,
                              label: 'Date Applied',
                              element: getCalendarDate(
                                  requestDetails?.creationDate,
                              ),
                          },
                          {
                              infoId: 2,
                              label: 'Date Approved',
                              element: getCalendarDate(
                                  requestDetails?.reviewedDate,
                              ),
                          },
                      ]
                    : [
                          {
                              infoId: 1,
                              label: 'Date Applied',
                              element: getCalendarDate(
                                  requestDetails?.creationDate ?? '',
                              ),
                          },
                      ]
            }
        />
        <Spacer height={2} />
        <Input
            placeholder={requestDetails?.requestDesc ?? ''}
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
