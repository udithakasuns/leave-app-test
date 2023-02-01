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
import {
    TID_LEAVE_STATUS_DURATION,
    TID_LEAVE_STATUS_MEMBER,
    TID_LEAVE_STATUS_RECIPIENT,
    TID_LEAVE_STATUS_STATUS,
    TID_LEAVE_STATUS_TYPE,
} from 'src/utils/testIds';
import { AtLeast, PendingRequestByID, TestProps } from 'src/utils/types';
import { AvatarChip, StatusChip } from 'components/molecules';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: PendingRequestByID;
    flexEnd: boolean;
    isMemberVisible: boolean;
    isStatusVisible: boolean;
    isDurationVisible: boolean;
    isRecipientVisible: boolean;
}

const LAEmployeeRequestDetails = ({
    requestDetails,
    flexEnd = false,
    isStatusVisible = false,
    isMemberVisible = false,
    isDurationVisible = true,
    isRecipientVisible = false,
}: AtLeast<Props, 'requestDetails'>) => {
    const ItemRow = ({
        testId,
        title,
        titleStyle,
        child,
    }: {
        testId: string;
        title: string;
        child: ReactNode;
        titleStyle?: StyleProp<TextStyle>;
    }) => (
        <View
            testID={testId}
            style={flexEnd ? styles.itemRowFlexEnd : styles.itemRow}>
            <Text type='ParaLG' style={[styles.itemText, titleStyle]}>
                {title}
            </Text>
            {child}
        </View>
    );

    return (
        <>
            {isMemberVisible && (
                <>
                    <Spacer />
                    <ItemRow
                        testId={TID_LEAVE_STATUS_MEMBER}
                        title={flexEnd ? 'Member' : 'Member :'}
                        child={
                            <>
                                <Spacer />
                                <AvatarChip
                                    label={requestDetails?.employee.name ?? ''}
                                    source={{
                                        uri:
                                            requestDetails?.employee?.authPic ??
                                            '',
                                    }}
                                />
                            </>
                        }
                    />
                </>
            )}
            <Spacer />
            {requestDetails && (
                <ItemRow
                    testId={TID_LEAVE_STATUS_TYPE}
                    title={flexEnd ? 'Type' : 'Type :'}
                    child={
                        <>
                            <Spacer />
                            <Chip
                                content={getEntitlementChipText(
                                    requestDetails.leaveType,
                                    requestDetails?.leaveType?.name ?? '',
                                )}
                                contentTextType='ParaLG'
                                containerStyle={styles.chipContainer}
                            />
                        </>
                    }
                />
            )}
            {requestDetails?.status && isStatusVisible && (
                <>
                    <Spacer />
                    <ItemRow
                        testId={TID_LEAVE_STATUS_STATUS}
                        title={flexEnd ? 'Status' : 'Status :'}
                        child={
                            <>
                                <Spacer />
                                <StatusChip
                                    status={requestDetails?.status}
                                    containerStyle={styles.statusContainer}
                                    onPress={() => {}}
                                />
                            </>
                        }
                    />
                </>
            )}
            <Spacer />
            {requestDetails?.startDate && isDurationVisible && (
                <ItemRow
                    testId={TID_LEAVE_STATUS_DURATION}
                    title={flexEnd ? 'Leave Duration' : 'Duration :'}
                    child={
                        <>
                            <Spacer />
                            <View
                                style={
                                    flexEnd
                                        ? styles.durationContainerFlexEnd
                                        : styles.durationContainer
                                }>
                                <Chip
                                    content={`${getLeaveDurationDays(
                                        requestDetails.durationDays,
                                        requestDetails.leaveState,
                                    )}`}
                                    contentTextType='ParaLG'
                                    containerStyle={styles.durationChip}
                                />
                                <Spacer width={2} height={3} />
                                <Chip
                                    content={getCalendarRangeDate(
                                        requestDetails?.startDate,
                                        requestDetails?.endDate,
                                    )}
                                    contentTextType='ParaLG'
                                    containerStyle={styles.durationChip}
                                />
                            </View>
                        </>
                    }
                />
            )}
            {isRecipientVisible && requestDetails?.reviewer && (
                <>
                    <Spacer />
                    <ItemRow
                        testId={TID_LEAVE_STATUS_RECIPIENT}
                        title='Recipient :'
                        child={
                            <>
                                <Spacer />
                                <AvatarChip
                                    label={requestDetails?.reviewer?.name ?? ''}
                                    source={{
                                        uri:
                                            requestDetails?.reviewer?.authPic ??
                                            '',
                                    }}
                                />
                            </>
                        }
                    />
                    <Spacer />
                </>
            )}
            <Spacer />
        </>
    );
};

export default LAEmployeeRequestDetails;
