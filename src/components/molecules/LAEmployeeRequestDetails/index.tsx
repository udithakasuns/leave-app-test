/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { Chip, Spacer, Text } from 'src/components/atoms';
import {
    getCalendarRangeDate,
    getLeaveDurationDays,
} from 'src/utils/helpers/dateHandler';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import { AtLeast, RequestDetails, TestProps } from 'src/utils/types';
import { AvatarChip, StatusChip } from '..';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    isStatusVisible: boolean;
    isDurationVisible: boolean;
    isRecipientVisible: boolean;
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

const LARequestDetailsSection = ({
    requestDetails,
    isStatusVisible = true,
    isDurationVisible = true,
    isRecipientVisible = true,
}: AtLeast<Props, 'requestDetails'>) => (
    <>
        <Spacer />
        {requestDetails?.leaveRequest?.leaveType && (
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
        {requestDetails?.leaveRequest?.status && isStatusVisible && (
            <>
                <Spacer />
                <ItemRow
                    title='Status :'
                    child={
                        <>
                            <Spacer />
                            <StatusChip
                                status={requestDetails.leaveRequest?.status}
                                containerStyle={styles.statusContainer}
                                onPress={() => {}}
                            />
                        </>
                    }
                />
            </>
        )}
        <Spacer />
        {isDurationVisible && requestDetails?.leaveRequest && (
            <ItemRow
                title='Duration :'
                child={
                    <>
                        <Spacer />
                        <View style={styles.durationContainer}>
                            <Chip
                                containerStyle={styles.durationChip}
                                content={`${getLeaveDurationDays(
                                    requestDetails?.leaveRequest
                                        ?.durationDays ?? 0,
                                    requestDetails?.leaveRequest?.leaveState ??
                                        'FULLDAY',
                                )}`}
                                contentTextType='ParaLG'
                            />
                            <Spacer width={2} height={3} />
                            {requestDetails?.leaveRequest?.startDate && (
                                <Chip
                                    containerStyle={styles.durationChip}
                                    content={getCalendarRangeDate(
                                        requestDetails.leaveRequest?.startDate,
                                        requestDetails.leaveRequest?.endDate,
                                    )}
                                    contentTextType='ParaLG'
                                />
                            )}
                        </View>
                    </>
                }
            />
        )}
        {isRecipientVisible && requestDetails?.recipient && (
            <>
                <Spacer />
                <ItemRow
                    title='Recipient :'
                    child={
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Spacer />
                            {requestDetails.recipient?.map(item => (
                                <AvatarChip
                                    key={item?.employeeId}
                                    label={item?.name ?? ''}
                                    source={{
                                        uri: item?.authPic ?? '',
                                    }}
                                />
                            ))}
                        </View>
                    }
                />
            </>
        )}
        <Spacer />
    </>
);

export default LARequestDetailsSection;