import React from 'react';
import { View } from 'react-native';
import { Text, Toggle } from 'src/components/atoms';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    testId: string;
    label: string;
    value: boolean;
    disabled: boolean;
    onChangeValue: () => void;
}

const ToggleItem = ({
    testId,
    label,
    value,
    disabled,
    onChangeValue,
}: AtLeast<Props, 'testId' | 'label' | 'value' | 'onChangeValue'>) => (
    <View style={styles.toggleContainer}>
        <Text style={{ width: '50%' }}>{label}</Text>
        <Toggle
            testID={testId}
            disabled={disabled}
            value={value}
            onValueChange={onChangeValue}
        />
    </View>
);

export default React.memo(ToggleItem);
