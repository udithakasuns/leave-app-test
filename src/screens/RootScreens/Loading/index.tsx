import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LoadingScreenProps } from 'src/navigators/types';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const Loading: React.FC<LoadingScreenProps> = () => (
    <View style={styles.container}>
        <ActivityIndicator color={colors.primaryColor} size='large' />
    </View>
);

export default Loading;
