import React from 'react';
import { View } from 'react-native';
import { Text, Toggle } from 'src/components/atoms';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    label: string;
    value: boolean;
    disabled: boolean;
    onChangeValue: () => void;
}

const ToggleItem = ({
    label,
    value,
    disabled,
    onChangeValue,
}: AtLeast<Props, 'label' | 'value' | 'onChangeValue'>) => (
    <View style={styles.toggleContainer}>
        <Text style={{ width: '50%' }}>{label}</Text>
        <Toggle
            disabled={disabled}
            value={value}
            onValueChange={onChangeValue}
        />
    </View>
);

export default React.memo(ToggleItem);
