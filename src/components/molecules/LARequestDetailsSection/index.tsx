/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { Chip, Spacer, Text } from 'src/components/atoms';
import { getCalendarRangeDate } from 'src/utils/helpers/dateHandler';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import { RequestDetails, TestProps } from 'src/utils/types';
import { AvatarChip } from '..';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
}

const ItemRow = ({
    title,
    titleStyle,
    child,
}: {
    title: string;
    child: ReactNode;
    titleStyle?: StyleProp<TextStyle>;
}) => (
    <View style={styles.itemRow}>
        <Text type='ParaLG' style={[styles.itemText, titleStyle]}>
            {title}
        </Text>
        {child}
    </View>
);

const LARequestDetailsSection = ({ requestDetails }: Props) => (
    <>
        <Spacer />
        {requestDetails.leaveRequest && (
            <ItemRow
                title='Type :'
                child={
                    <>
                        <Spacer />
                        <Chip
                            content={getEntitlementChipText(
                                requestDetails.leaveRequest.leaveType,
                                requestDetails.leaveRequest?.leaveType?.name ??
                                    '',
                            )}
                            contentTextType='ParaLG'
                            containerStyle={styles.chipContainer}
                        />
                    </>
                }
            />
        )}
        <Spacer height={8} />
        {requestDetails.leaveRequest?.startDate && (
            <ItemRow
                title='Duration :'
                titleStyle={styles.durationText}
                child={
                    <>
                        <Spacer />
                        <View style={styles.durationContainer}>
                            <Chip
                                content={`${requestDetails.durationDays}`}
                                contentTextType='ParaLG'
                                containerStyle={styles.durationChip}
                            />
                            <Spacer width={2} height={3} />
                            <Chip
                                content={getCalendarRangeDate(
                                    requestDetails.leaveRequest?.startDate,
                                    requestDetails.leaveRequest?.endDate,
                                )}
                                contentTextType='ParaLG'
                                containerStyle={styles.durationChip}
                            />
                        </View>
                    </>
                }
            />
        )}
        <Spacer height={2} />
        <ItemRow
            title='Recipient :'
            child={
                <>
                    <Spacer />
                    {requestDetails.recipient?.map(item => (
                        <AvatarChip
                            key={item.employeeId}
                            label={item.name ?? ''}
                            source={{
                                uri: item.authPic ?? '',
                            }}
                        />
                    ))}
                </>
            }
        />
        <Spacer />
    </>
);

export default LARequestDetailsSection;
