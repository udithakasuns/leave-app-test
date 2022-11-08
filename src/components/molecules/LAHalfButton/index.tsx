import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'src/components/atoms';
import { TestProps } from 'src/utils/types';
import styles from './styles';

export type HalfDayProp = {
    rightHalfTitle: string;
    leftHalfTitle: string;
    isRightSelected: boolean;
    isLeftSelected: boolean;
};

type HalfButtonPropsTest = Partial<TestProps> & {
    testIdRightButton: string;
    testIdLeftButton: string;
};

interface Props extends Partial<HalfButtonPropsTest> {
    label: string;
    icon: string;
    isHalfSelected: boolean;
    onPress: (title: string) => void;
    halfDay: Omit<HalfDayProp, 'isRightSelected' | 'isLeftSelected'>;
}

const LAHalfButton = ({
    label,
    onPress,
    icon,
    isHalfSelected = false,
    halfDay,
    testId,
    testIdRightButton,
    testIdLeftButton,
}: Props) => {
    const [isHalfDay, setIsHalfDay] = useState<boolean>(isHalfSelected);
    const [selectedHalfDay, setSelectedHalfDay] =
        useState<Pick<HalfDayProp, 'isRightSelected' | 'isLeftSelected'>>();

    const onButtonPress = () => {
        setIsHalfDay(true);
    };

    const onHalfDayPress = (id: number) => {
        if (id === 1) {
            setSelectedHalfDay({
                isLeftSelected: false,
                isRightSelected: true,
            });
            onPress(halfDay.rightHalfTitle);
        } else {
            setSelectedHalfDay({
                isLeftSelected: true,
                isRightSelected: false,
            });
            onPress(halfDay.leftHalfTitle);
        }
    };

    const {
        rightContainer,
        halfButtonContainer,
        leftContainer,
        leftText,
        rightText,
        initialIconLabelContainer,
        initialButtonContainer,
    } = styles({
        isLeftSelected: selectedHalfDay?.isLeftSelected,
        isRightSelected: selectedHalfDay?.isRightSelected,
    });

    if (isHalfDay) {
        return (
            <View style={halfButtonContainer}>
                <TouchableOpacity
                    testID={testIdRightButton}
                    onPress={() => onHalfDayPress(1)}
                    style={rightContainer}>
                    <Text color={leftText.color}>{halfDay.rightHalfTitle}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    testID={testIdLeftButton}
                    onPress={() => onHalfDayPress(2)}
                    style={leftContainer}>
                    <Text color={rightText.color}>{halfDay.leftHalfTitle}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <Button
            testID={testId}
            label={label}
            mode='contained-gray'
            icon={icon}
            iconPosition='left'
            iconLabelContainerStyle={initialIconLabelContainer}
            buttonStyle={initialButtonContainer}
            onPress={onButtonPress}
        />
    );
};
export default LAHalfButton;
