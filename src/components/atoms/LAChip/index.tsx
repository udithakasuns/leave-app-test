/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
    View,
    Pressable,
    ColorValue,
    ViewStyle,
    TextStyle,
} from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, IconLibrary, TestProps, TextTypeProps } from 'utils/types';
import LAIcon from '../LAIcon';
import LAText from '../LAText';
import chipStyles from './styles';

const {
    colors: { gray600, tertiaryColor, disabledColor },
    scale: { sc16 },
} = theme;

export interface Props extends TestProps {
    content: string;
    contentColor: ColorValue;
    contentTextType: TextTypeProps;
    outline: boolean;
    outlineColor: ColorValue;
    backgroundColor: ColorValue;
    pressableContainerStyle: ViewStyle;
    containerStyle: ViewStyle;
    contentStyle: TextStyle;
    disabled: boolean;
    leftIconName: string;
    leftIconSize: number;
    leftIconColor: string;
    leftIconLibrary: IconLibrary;
    rightIconLibrary: IconLibrary;
    rightIconName: string;
    rightIconSize: number;
    rightIconColor: string;
    onPressChip: () => void;
    onPressLeft: () => void;
    onPressRight: () => void;
    testIdChipPressable: string;
    testIdLeftPressable: string;
    testIdRightPressable: string;
}

const LAChip = ({
    content,
    contentColor = gray600,
    contentTextType = 'ParaSM',
    contentStyle,
    pressableContainerStyle,
    outline = false,
    outlineColor,
    backgroundColor = tertiaryColor,
    containerStyle,
    leftIconName,
    leftIconSize = sc16,
    leftIconColor,
    leftIconLibrary,
    rightIconLibrary,
    rightIconName,
    rightIconSize = sc16,
    rightIconColor,
    onPressChip,
    onPressLeft,
    onPressRight,
    disabled = false,
    testIdcontainer,
    testIdLeftIcon,
    testIdRightIcon,
    testIdChipPressable,
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

    const Component = () => (
        <View
            testID={testIdcontainer}
            style={[styles.container, containerStyle]}>
            {leftIconName && (
                <Pressable
                    testID={testIdLeftPressable}
                    hitSlop={10}
                    disabled={Boolean(onPressChip) || disabled}
                    onPress={onPressLeft}>
                    <LAIcon
                        testId={testIdLeftIcon}
                        library={leftIconLibrary}
                        name={leftIconName}
                        color={disabled ? disabledColor : leftIconColor}
                        size={leftIconSize}
                    />
                </Pressable>
            )}
            <LAText
                testID={testIdContent}
                style={[styles.content, contentStyle]}
                color={disabled ? disabledColor : contentColor}
                numberOfLines={1}
                type={contentTextType}>
                {content}
            </LAText>
            {rightIconName && (
                <Pressable
                    testID={testIdRightPressable}
                    hitSlop={10}
                    disabled={Boolean(onPressChip) || disabled}
                    onPress={onPressRight}>
                    <LAIcon
                        testId={testIdRightIcon}
                        name={rightIconName}
                        library={rightIconLibrary}
                        color={disabled ? disabledColor : rightIconColor}
                        size={rightIconSize}
                    />
                </Pressable>
            )}
        </View>
    );

    if (onPressChip) {
        return (
            <Pressable
                testID={testIdChipPressable}
                onPress={onPressChip}
                style={pressableContainerStyle}
                disabled={
                    Boolean(onPressLeft) || Boolean(onPressRight) || disabled
                }>
                <Component />
            </Pressable>
        );
    }
    return <Component />;
};

export default LAChip;
