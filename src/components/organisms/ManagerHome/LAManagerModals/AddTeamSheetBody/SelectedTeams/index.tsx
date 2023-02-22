/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';
import {
    Chip,
    MultiSearchableDropdownListProps as List,
} from 'src/components/atoms';
import { styles } from './styles';

interface Props {
    list: List[];
    onPressListItem: (item: List) => void;
}

const SelectedTeams = ({ list, onPressListItem }: Props) => (
    <View style={styles.container}>
        {list
            .filter(item => item.isSelected)
            .map(item => (
                <Chip
                    content={item.value}
                    containerStyle={{ marginRight: 5, marginTop: 5 }}
                    rightIconName='close'
                    outline
                    onPressRight={() => onPressListItem(item)}
                />
            ))}
    </View>
);

export default SelectedTeams;
