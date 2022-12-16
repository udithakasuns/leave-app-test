import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const LAModalLoder = () => (
    <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.primaryColor} />
    </View>
);

export default LAModalLoder;
