import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import { AtLeast, TextTypeProps } from 'src/utils/types';
import { styles } from './styles';

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
}: AtLeast<Props, 'title'>) => (
    <View style={[styles.container, containerStyle]}>
        <Text testID={testIdTitle} type={unicodeTextType}>
            🧐
        </Text>
        <Text
            testID={testIdSubTitle}
            type={titleTextType}
            style={[styles.title, titleTextStyle]}>
            {title}
        </Text>
        {subTitle && (
            <Text
                type={subTitleTextType}
                style={[styles.subTitle, subTitleTextStyle]}>
                {subTitle}
            </Text>
        )}
    </View>
);

export default React.memo(LAErrorContent);
