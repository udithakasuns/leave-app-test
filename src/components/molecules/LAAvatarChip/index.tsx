import React from 'react';
import {
    ImageSourcePropType,
    StyleProp,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { Avatar, AvatarSize, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from '../../../utils/types';
import styles from './styles';

const { colors } = theme;

interface Props extends TestProps {
    label: string;
    source: ImageSourcePropType;
    size: AvatarSize;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    textColor: string;
}

const LAAvatarChip = ({
    size = AvatarSize.small,
    source,
    containerStyle,
    label,
    labelStyle,
    textColor = colors.gray600,
}: AtLeast<Props, 'source' | 'label'>) => {
    const { container, textContainer } = styles(size);
    return (
        <View style={[container, containerStyle]}>
            <Avatar source={source} size={size} />
            <Text
                type={size === AvatarSize.large ? 'ParaLG' : 'ParaSM'}
                color={textColor}
                style={[textContainer, labelStyle]}>
                {label}
            </Text>
        </View>
    );
};

export default LAAvatarChip;
