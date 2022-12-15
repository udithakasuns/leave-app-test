import React from 'react';
import { View } from 'react-native';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';

import { styles } from './styles';

interface Props {
    title: string;
    onBackPress: () => void;
}

const LABackHeader = ({ title, onBackPress }: Props) => (
    <View style={styles.container}>
        <Icon
            name='arrow-back'
            enableBackground
            size={IconSize.medium}
            increasePadding={1}
            onPress={onBackPress}
        />
        <Spacer />
        <Text>{title}</Text>
    </View>
);

export default LABackHeader;
