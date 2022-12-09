/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'src/components/atoms';
import { PartialBy, TestProps } from 'src/utils/types';
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
    isError: boolean;
    onPress: (title: string) => void;
    onInitialPress: () => void;
    halfDay: Omit<HalfDayProp, 'isRightSelected' | 'isLeftSelected'>;
    selectedDay: Pick<HalfDayProp, 'isRightSelected' | 'isLeftSelected'>;
}

const LAHalfButton = ({
    label,
    onPress,
    onInitialPress,
    icon,
    isHalfSelected = false,
    isError = false,
    halfDay,
    selectedDay,
    testId,
    testIdRightButton,
    testIdLeftButton,
}: PartialBy<Props, 'isError'>) => {
    const [isHalfDay, setIsHalfDay] = useState<boolean>(isHalfSelected);
    const [selectedHalfDay, setSelectedHalfDay] = useState<
        Pick<HalfDayProp, 'isRightSelected' | 'isLeftSelected'> | undefined
    >(selectedDay);

    const onButtonPress = () => {
        onInitialPress && onInitialPress();
        setSelectedHalfDay(undefined);
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
        isError,
    });

    useEffect(() => {
        setIsHalfDay(isHalfSelected);
    }, [isHalfSelected]);

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
            mode={isError ? 'outlined-light-error' : 'contained-gray'}
            icon={icon}
            iconPosition='left'
            iconLabelContainerStyle={initialIconLabelContainer}
            buttonStyle={initialButtonContainer}
            onPress={onButtonPress}
        />
    );
};
export default LAHalfButton;
