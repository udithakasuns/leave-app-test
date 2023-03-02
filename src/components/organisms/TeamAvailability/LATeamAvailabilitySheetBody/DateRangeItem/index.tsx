import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import styles from './styles';

interface Props {
    testID: string;
    onPress: () => void;
    selected: boolean;
    dateRange: string;
}

const { colors } = theme;

const DateRangeItem = ({
    testID,
    onPress,
    selected = false,
    dateRange,
}: Props) => {
    const containerStyle = styles({ selected });
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle.container}>
            <Text
                testID={testID}
                color={selected ? colors.white : colors.gray600}>
                {dateRange}
            </Text>
        </TouchableOpacity>
    );
};

export default DateRangeItem;
