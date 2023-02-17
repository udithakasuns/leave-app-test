import React from 'react';
import { View, Pressable } from 'react-native';
import { Icon, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { styles } from './style';

const { colors } = theme;

interface Props {
    label: string;
    isSelected: boolean;
    index: number;
    onPress: () => void;
}

const ListItem = ({ label, isSelected, index, onPress }: Props) => (
    <Pressable
        onPress={onPress}
        style={[
            isSelected ? styles.listRowSelected : styles.listRow,
            index === 0 && { borderTopLeftRadius: 0 },
        ]}>
        <Text color={isSelected ? colors.secondaryOutline : colors.black}>
            {label}
        </Text>
        {isSelected ? (
            <Icon name='check-circle' color={colors.secondaryOutline} />
        ) : (
            <View />
        )}
    </Pressable>
);

export default React.memo(ListItem);
