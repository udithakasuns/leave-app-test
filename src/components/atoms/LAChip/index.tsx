import React from 'react';
import {
    View,
    Pressable,
    ColorValue,
    ViewStyle,
    TextStyle,
} from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, TestProps, TextTypeProps } from 'utils/types';
import LAIcon from '../LAIcon';
import LAText from '../LAText';
import chipStyles from './styles';

const {
    colors: { gray600, tertiaryColor, disabledColor },
    scale: { sc16 },
} = theme;

interface Props extends TestProps {
    content: string;
    contentColor: ColorValue;
    contentTextType: TextTypeProps;
    outline: boolean;
    outlineColor: ColorValue;
    backgroundColor: ColorValue;
    containerStyle: ViewStyle;
    contentStyle: TextStyle;
    disabled: boolean;
    leftIconName: string;
    leftIconSize: number;
    leftIconColor: string;
    rightIconName: string;
    rightIconSize: number;
    rightIconColor: string;
    onPressLeft: () => void;
    onPressRight: () => void;
    testIdLeftPressable: string;
    testIdRightPressable: string;
}

const LAChip = ({
    content,
    contentColor = gray600,
    contentTextType = 'ParaSM',
    contentStyle,
    outline = false,
    outlineColor,
    backgroundColor = tertiaryColor,
    containerStyle,
    leftIconName,
    leftIconSize = sc16,
    leftIconColor,
    rightIconName,
    rightIconSize = sc16,
    rightIconColor,
    onPressLeft,
    onPressRight,
    disabled = false,
    testIdcontainer,
    testIdLeftIcon,
    testIdRightIcon,
    testIdLeftPressable,
    testIdRightPressable,
    testIdContent,
}: AtLeast<Props, 'content'>) => {
    const styles = chipStyles({
        outline,
        outlineColor,
        disabled,
        backgroundColor,
    });

    return (
        <View
            testID={testIdcontainer}
            style={[styles.container, containerStyle]}>
            {leftIconName && (
                <Pressable
                    testID={testIdLeftPressable}
                    hitSlop={10}
                    disabled={disabled}
                    onPress={onPressLeft}>
                    <LAIcon
                        testId={testIdLeftIcon}
                        name={leftIconName}
                        color={disabled ? disabledColor : leftIconColor}
                        size={leftIconSize}
                    />
                </Pressable>
            )}
            <LAText
                testId={testIdContent}
                style={[styles.content, contentStyle]}
                color={disabled ? disabledColor : contentColor}
                type={contentTextType}>
                {content}
            </LAText>
            {rightIconName && (
                <Pressable
                    testID={testIdRightPressable}
                    hitSlop={10}
                    disabled={disabled}
                    onPress={onPressRight}>
                    <LAIcon
                        testId={testIdRightIcon}
                        name={rightIconName}
                        color={disabled ? disabledColor : rightIconColor}
                        size={rightIconSize}
                    />
                </Pressable>
            )}
        </View>
    );
};

export default LAChip;
