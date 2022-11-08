/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import {
    ChipGroup,
    FilterButtons,
    Modal,
    MultiButtonProps,
    MultiChipProps,
} from 'src/components/molecules';
import { SortSheetBody } from './SortSheetBody';
import { styles } from './styles';

type FilterProps = {
    sortByButtons: MultiButtonProps[];
    leaveStatusChips: MultiChipProps[];
    leaveTypeChips: MultiChipProps[];
};

const Filters = ({
    sortByButtons,
    leaveTypeChips,
    leaveStatusChips,
}: FilterProps) => {
    const [isSortModalVisible, setIsSortModalVisible] =
        useState<boolean>(false);

    const [isFilterModalVisible, setIsFilterModalVisible] =
        useState<boolean>(false);
    return (
        <>
            <FilterButtons
                sortBy='Date Request'
                onPressSortBy={() => setIsSortModalVisible(state => !state)}
                onPressFilter={() => setIsFilterModalVisible(state => !state)}
            />
            <Modal
                onClose={() => setIsSortModalVisible(state => !state)}
                isVisible={isSortModalVisible}
                header='Sort by:'
                sheetBody={
                    <SortSheetBody
                        sortByButtons={sortByButtons}
                        onPress={() => {}}
                    />
                }
            />
            <Modal
                onClose={() => setIsFilterModalVisible(state => !state)}
                isVisible={isFilterModalVisible}
                header='Filter by:'
                sheetBody={
                    <View style={styles.filterSheetContainer}>
                        <Spacer height={5} />
                        <Text
                            style={styles.filterSheetSubHeadings}
                            type='ParaSMBold'>
                            Leave Status
                        </Text>
                        <Spacer height={5} />
                        <ChipGroup
                            chips={leaveStatusChips}
                            onPress={() => {}}
                        />
                        <Spacer height={5} />
                        <Text
                            style={styles.filterSheetSubHeadings}
                            type='ParaSMBold'>
                            Leave Type
                        </Text>
                        <Spacer height={5} />
                        <ChipGroup chips={leaveTypeChips} onPress={() => {}} />
                        <Spacer height={10} />
                        <Button
                            label='Apply'
                            mode='outlined'
                            labelStyle={{ paddingHorizontal: 10 }}
                            onPress={() => {}}
                        />
                    </View>
                }
            />
        </>
    );
};

export default Filters;
