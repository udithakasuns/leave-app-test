/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';
import { Chip, Spacer, Text } from 'src/components/atoms';
import { getCalendarRangeDate } from 'src/utils/helpers/dateHandler';
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

const getDays = (durationHours: number) => {
    const day = durationHours;
    if (day === 0.5) {
        return 'Half Day';
    }
    if (day === 1) {
        return '1 Day';
    }
    return `${day} Days`;
};

const LARequestDetailsSection = ({
    requestDetails,
    isStatusVisible = true,
    isDurationVisible = true,
    isRecipientVisible = true,
}: AtLeast<Props, 'requestDetails'>) => (
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
        {requestDetails.leaveRequest?.status && isStatusVisible && (
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
        <Spacer height={8} />
        {requestDetails.leaveRequest?.startDate && isDurationVisible && (
            <ItemRow
                title='Duration :'
                titleStyle={styles.durationText}
                child={
                    <>
                        <Spacer />
                        <View style={styles.durationContainer}>
                            {requestDetails?.leaveRequest?.durationHours && (
                                <Chip
                                    content={`${getDays(
                                        requestDetails.leaveRequest
                                            .durationHours / 8,
                                    )}`}
                                    contentTextType='ParaLG'
                                    containerStyle={styles.durationChip}
                                />
                            )}
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
        {isRecipientVisible && (
            <>
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
        )}
    </>
);

export default LARequestDetailsSection;
