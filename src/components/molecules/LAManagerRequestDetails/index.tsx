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
import { AtLeast, PendingRequestByID, TestProps } from 'src/utils/types';
import { AvatarChip, StatusChip } from '..';
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
        title,
        titleStyle,
        child,
    }: {
        title: string;
        child: ReactNode;
        titleStyle?: StyleProp<TextStyle>;
    }) => (
        <View style={flexEnd ? styles.itemRowFlexEnd : styles.itemRow}>
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
                        title={flexEnd ? 'Member' : 'Member :'}
                        child={
                            <>
                                <Spacer />
                                <AvatarChip
                                    containerStyle={{ marginLeft: 10 }}
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
            <Spacer height={8} />
            {requestDetails?.startDate && isDurationVisible && (
                <ItemRow
                    title={flexEnd ? 'Leave Duration' : 'Duration :'}
                    titleStyle={styles.durationText}
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
                    <ItemRow
                        title='Recipient :'
                        child={
                            <AvatarChip
                                containerStyle={{ marginLeft: 10 }}
                                label={requestDetails?.reviewer?.name ?? ''}
                                source={{
                                    uri:
                                        requestDetails?.reviewer?.authPic ?? '',
                                }}
                            />
                        }
                    />
                    <Spacer />
                </>
            )}
        </>
    );
};

export default LAEmployeeRequestDetails;
