import React from 'react';
import { View } from 'react-native';
import { ButtonGroup, MultiButtonProps } from 'src/components/molecules';
import { styles } from './styles';

const SortSheetBody = ({
    sortByButtons,
    onPress,
}: {
    sortByButtons: MultiButtonProps[];
    onPress: (multiButtons: MultiButtonProps[]) => void;
}) => (
    <View style={styles.sortSheetContainer}>
        <ButtonGroup buttons={sortByButtons} onPress={onPress} />
    </View>
);

export default SortSheetBody;
