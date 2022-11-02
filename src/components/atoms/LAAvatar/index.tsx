import React from 'react';
import {
    ImageSourcePropType,
    ViewStyle,
    StyleProp,
    Image,
    View,
} from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from '../../../utils/types';
import styles from './styles';

const { scale } = theme;

export enum AvatarSize {
    'small' = scale.sc32,
    'large' = scale.sc46,
}

interface Props extends TestProps {
    source: ImageSourcePropType;
    size: AvatarSize;
    style?: StyleProp<ViewStyle>;
}

const LAText = ({
    size = AvatarSize.large,
    source,
    style,
    testId,
}: AtLeast<Props, 'source'>) => {
    const { container, imageContainer } = styles(size);
    return (
        <View style={[container, style]}>
            <Image
                testID={testId}
                source={source}
                style={imageContainer}
                accessibilityIgnoresInvertColors
            />
        </View>
    );
};

export default LAText;
