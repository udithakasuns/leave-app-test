/* eslint-disable react/require-default-props */
import React from 'react';
import { ViewStyle } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SvgIcon } from 'src/assets/icons';
import theme from '../../../utils/theme';
import { AtLeast, IconLibrary, TestProps } from '../../../utils/types';
import { styles } from './styles';

const { scale, colors } = theme;

export enum IconSize {
    xxSmall = scale.sc10,
    xSmall = scale.sc12,
    small = scale.sc16,
    medium = scale.sc18,
    large = scale.sc24,
    xLarge = scale.sc28,
    xxLarge = scale.sc32,
}
interface Props extends TestProps {
    name: string;
    size: IconSize;
    color: string;
    style: ViewStyle;
    onPress: () => void;
    enableBackground: boolean;
    backgroundColor: string;
    touchableRef: React.LegacyRef<MaterialIcon>;
    increasePadding: number;
    library?: IconLibrary;
}

const LAIcon = ({
    size = IconSize.large,
    name,
    color = colors.black,
    style,
    backgroundColor = colors.secondaryGray,
    touchableRef,
    increasePadding = 1,
    enableBackground,
    onPress,
    testId,
    library = 'material',
}: AtLeast<Props, 'name'>) => {
    let iconSize = size;
    let padding = 0;

    if (enableBackground) {
        switch (size) {
            case IconSize.xSmall:
                iconSize = scale.sc8;
                padding = increasePadding * scale.sc2;
                break;
            case IconSize.small:
                iconSize = scale.sc12;
                padding = increasePadding * scale.sc2;
                break;
            case IconSize.medium:
                iconSize = scale.sc20;
                padding = increasePadding * scale.sc2;
                break;
            case IconSize.large:
                iconSize = scale.sc24;
                padding = increasePadding * scale.sc4;
                break;
            case IconSize.xLarge:
                iconSize = scale.sc32;
                padding = increasePadding * scale.sc4;
                break;
            case IconSize.xxLarge:
                iconSize = scale.sc40;
                padding = increasePadding * scale.sc4;
                break;
            default:
                break;
        }
    }

    const styleObject = enableBackground
        ? {
              ...styles.iconWithBackground,
              padding,
              borderRadius: padding + iconSize / 2,
              width: iconSize + 2 * padding,
              backgroundColor,
              ...style,
          }
        : { ...style };

    if (library === 'community')
        return (
            <MaterialCommunityIcons
                name={name}
                size={iconSize}
                color={color}
                onPress={onPress}
                ref={touchableRef}
                style={[styleObject]}
                testID={testId}
            />
        );

    if (library === 'svg') return <SvgIcon name={name} color={color} />;

    return (
        <MaterialIcon
            name={name}
            size={iconSize}
            color={color}
            onPress={onPress}
            ref={touchableRef}
            style={[styleObject]}
            testID={testId}
        />
    );
};

export default LAIcon;
