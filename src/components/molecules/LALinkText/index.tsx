import React from 'react';
import {
    TouchableOpacity,
    StyleProp,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, TextTypeProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    testIdText: string;
    text: string;
    textType: TextTypeProps;
    textColor: string;
    textStyle: StyleProp<TextStyle>;
    containerStyle: StyleProp<ViewStyle>;
    onPress: () => void;
}

const LALinkText = ({
    testIdText,
    text,
    textType = 'SubH',
    textColor = colors.primaryGrayLabel,
    textStyle,
    containerStyle,
    onPress,
}: AtLeast<Props, 'text'>) => (
    <TouchableOpacity
        style={containerStyle}
        disabled={!onPress}
        onPress={onPress}>
        <Text
            testID={testIdText}
            type={textType}
            style={[styles.text, textStyle]}
            color={textColor}>
            {text}
        </Text>
    </TouchableOpacity>
);

export default React.memo(LALinkText);
