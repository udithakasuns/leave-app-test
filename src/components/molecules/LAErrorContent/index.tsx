import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { AtLeast, TextTypeProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    testIdTitle: string;
    testIdSubTitle: string;
    title: string;
    subTitle: string;
    unicodeTextType: TextTypeProps;
    titleTextType: TextTypeProps;
    subTitleTextType: TextTypeProps;
    containerStyle: StyleProp<ViewStyle>;
    titleTextStyle: StyleProp<TextStyle>;
    subTitleTextStyle: StyleProp<TextStyle>;
    titleColor: string;
    subtitleColor: string;
}

const LAErrorContent = ({
    testIdTitle = `${TID}TEXT_ERROR_TITLE`,
    testIdSubTitle = `${TID}TEXT_ERROR_SUBTITLE`,
    title,
    subTitle,
    containerStyle,
    unicodeTextType = 'H1',
    titleTextType = 'SubHBold',
    subTitleTextType = 'ParaSM',
    titleTextStyle,
    subTitleTextStyle,
    titleColor = colors.black,
    subtitleColor = colors.gray700,
}: AtLeast<Props, 'title'>) => (
    <View style={[styles.container, containerStyle]}>
        <Text type={unicodeTextType}>🧐</Text>
        <Text
            testID={testIdTitle}
            type={titleTextType}
            color={titleColor}
            style={[styles.title, titleTextStyle]}>
            {title}
        </Text>
        {subTitle && (
            <Text
                testID={testIdSubTitle}
                type={subTitleTextType}
                color={subtitleColor}
                style={[styles.subTitle, subTitleTextStyle]}>
                {subTitle}
            </Text>
        )}
    </View>
);

export default React.memo(LAErrorContent);
