import React from 'react';
import { View, Pressable } from 'react-native';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';

import { styles } from './styles';

interface Props {
    title: string;
    onBackPress: () => void;
}

const LABackHeader = ({ title, onBackPress }: Props) => (
    <Pressable style={styles.container} onPress={onBackPress} hitSlop={10}>
        <Icon
            name='arrow-back'
            enableBackground
            size={IconSize.medium}
            increasePadding={1}
        />
        <Spacer />
        <Text>{title}</Text>
    </Pressable>
);

export default LABackHeader;
