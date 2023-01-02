import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';

import { AtLeast } from 'src/utils/types';
import theme from 'utils/theme';
import { styles } from './styles';

const { scale } = theme;

interface Props {
    containerStyle: ViewStyle;
    title: string;
    subTitle: string;
}

const LAEmptyError = ({
    containerStyle,
    title,
    subTitle,
}: AtLeast<Props, 'title'>) => (
    <View style={[styles.container, containerStyle]}>
        <Text style={styles.emoji}>🧐</Text>
        <Spacer height={scale.vsc6} />
        <View style={styles.headerContainer}>
            <Text type='H1Bold' style={styles.headerText}>
                {title}
            </Text>
            {subTitle && (
                <>
                    <Spacer height={scale.vsc6} />
                    <Text
                        type='ParaLG'
                        color={theme.colors.primaryGrayLabel}
                        style={styles.headerText}>
                        {subTitle}
                    </Text>
                </>
            )}
        </View>
        <Spacer height={scale.vsc10} />
    </View>
);

export default LAEmptyError;
