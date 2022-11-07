/* eslint-disable import/no-cycle */
import React from 'react';
import { View } from 'react-native';
import { ButtonGroup, MultiButtonProps } from 'src/components/molecules';
import { styles } from '../../EmployeeHome/LeaveRequestList/styles';

export const SortSheetBody = ({
    sortByButtons,
    onPress,
}: {
    sortByButtons: MultiButtonProps[];
    onPress: (Multibuttons: MultiButtonProps[]) => void;
}) => (
    <View style={styles.sortSheetContainer}>
        <ButtonGroup buttons={sortByButtons} onPress={onPress} />
    </View>
);
