/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    ImageSourcePropType,
    ViewStyle,
    StyleProp,
    Image,
    View,
} from 'react-native';
import { Img } from 'src/assets/images';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from '../../../utils/types';
import styles from './styles';

const { scale } = theme;

export enum AvatarSize {
    'small' = scale.sc36,
    'large' = scale.sc46,
}

interface Props extends TestProps {
    source: ImageSourcePropType;
    size: AvatarSize;
    style?: StyleProp<ViewStyle>;
}

const LAAvatar = ({
    size = AvatarSize.large,
    source,
    style,
    testId,
}: AtLeast<Props, 'source'>) => {
    const { container, imageContainer } = styles(size);

    let newSource: any = source;
    if (!newSource.uri) {
        newSource = Img('user');
    }

    return (
        <View style={[container, style]}>
            <Image
                testID={testId}
                source={newSource}
                style={imageContainer}
                accessibilityIgnoresInvertColors
                defaultSource={Img('user')}
            />
        </View>
    );
};

export default LAAvatar;
