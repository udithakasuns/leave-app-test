import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import theme from 'src/utils/theme';
import { PartialBy, TestProps } from 'src/utils/types';
import {
    TID_ENTILEMENT_TAKEN_LEAVE_COUNT,
    TID_ENTILEMENT_ALL_LEAVE_COUNT,
} from 'src/utils/testIds';
import LAText from '../LAText';
import styles from './styles';

interface Props extends Partial<TestProps> {
    takenLeaves: string;
    totalLeaves: string;
    uniCodeIcon: string;
    leaveType: string;
    isSelected: boolean;
    isError: boolean;
    isDisable: boolean;
    width: number;
    style: StyleProp<ViewStyle>;
}

const LALeaveCard = ({
    takenLeaves,
    totalLeaves,
    uniCodeIcon,
    leaveType,
    isSelected = false,
    isError = false,
    isDisable = false,
    width = theme.pixel(120 * 1.15),
    style,
    testId,
}: PartialBy<Props, 'isSelected' | 'width' | 'style'>) => {
    const {
        container,
        leaveContainer,
        takenLeavesContainer,
        footerContainer,
        totalLeavesContainer,
        entitlementTextContainer,
    } = styles(isSelected, width, isError, isDisable);

    return (
        <View testID={testId} style={[container, style]}>
            <View style={leaveContainer}>
                <LAText
                    testId={TID_ENTILEMENT_TAKEN_LEAVE_COUNT}
                    type='H1'
                    style={takenLeavesContainer}>
                    {takenLeaves}
                </LAText>
                <LAText
                    testId={TID_ENTILEMENT_ALL_LEAVE_COUNT}
                    type='ParaSM'
                    style={totalLeavesContainer}>
                    /{totalLeaves}
                </LAText>
            </View>
            <View style={footerContainer}>
                <LAText type='ParaSM' style={entitlementTextContainer}>
                    {leaveType}
                </LAText>
                <LAText type='ParaSM'>{uniCodeIcon}</LAText>
            </View>
        </View>
    );
};

export default LALeaveCard;
