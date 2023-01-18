import React from 'react';
import { View, ActivityIndicator, ViewStyle } from 'react-native';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { useStyles } from './styles';

const { colors, scale } = theme;

interface Props {
    isVisible: boolean;
    containerStyle: ViewStyle;
    marginTop: number;
    marginBottom: number;
    indicatorColor: string;
    indicatorSize: 'large' | 'small';
    testID: string;
}

const Loader = ({
    isVisible = true,
    marginTop = scale.sc4,
    marginBottom = 0,
    containerStyle,
    indicatorColor = colors.primaryColor,
    indicatorSize = 'small',
    testID,
}: AtLeast<Props, 'isVisible'>) => {
    if (!isVisible) return null;

    const styles = useStyles({ marginTop, marginBottom });

    return (
        <View style={[styles.container, containerStyle]} testID={testID}>
            <ActivityIndicator color={indicatorColor} size={indicatorSize} />
        </View>
    );
};
export default Loader;
