import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import theme from 'src/utils/theme';
import { PartialBy, TestProps } from 'src/utils/types';
import LAText from '../LAText';
import styles from './styles';

interface Props extends Partial<TestProps> {
    takenLeaves: string;
    totalLeaves: string;
    uniCodeIcon: string;
    leaveType: string;
    isSelected: boolean;
    width: number;
    style: StyleProp<ViewStyle>;
}

const LALeaveCard = ({
    takenLeaves,
    totalLeaves,
    uniCodeIcon,
    leaveType,
    isSelected = false,
    width = theme.s(130),
    style,
}: PartialBy<Props, 'isSelected' | 'width' | 'style'>) => {
    const {
        container,
        leaveContainer,
        takenLeavesContainer,
        footerContainer,
        totalLeavesContainer,
    } = styles(isSelected, width);

    return (
        <View style={[container, style]}>
            <View style={leaveContainer}>
                <LAText type='H1' style={takenLeavesContainer}>
                    {takenLeaves}
                </LAText>
                <LAText type='ParaSM' style={totalLeavesContainer}>
                    /{totalLeaves}
                </LAText>
            </View>
            <View style={footerContainer}>
                <LAText type='ParaSM'>{leaveType}</LAText>
                <LAText type='ParaSM'>{uniCodeIcon}</LAText>
            </View>
        </View>
    );
};

export default LALeaveCard;
