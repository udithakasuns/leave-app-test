/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
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

export type FilterChipsProps = {
    id: number;
    title: string;
    chips: MultiChipProps[];
};

export type FilterProps = {
    sortByButtons: MultiButtonProps[];
    filterChips: FilterChipsProps[];
    onSortPress: (multiButtons: MultiButtonProps[]) => void;
    onFilterPress: (multiButtons: FilterChipsProps[]) => void;
};

const LAFilters = ({
    sortByButtons,
    filterChips,
    onSortPress,
    onFilterPress,
}: FilterProps) => {
    const [isSortModalVisible, setIsSortModalVisible] =
        useState<boolean>(false);

    const [isFilterModalVisible, setIsFilterModalVisible] =
        useState<boolean>(false);

    const [filterChipsLocal, setFilterChipsLocal] = useState<
        FilterChipsProps[]
    >([]);

    const getSortByLabel = () => {
        const selectedButton = sortByButtons.filter(
            btn => btn.selected === true,
        )[0];
        return selectedButton.label;
    };

    useEffect(() => {
        const chipsDeepClone = JSON.parse(JSON.stringify(filterChips));
        setFilterChipsLocal(chipsDeepClone);
    }, [isFilterModalVisible]);

    return (
        <>
            <FilterButtons
                sortBy={getSortByLabel()}
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
                        onPress={multiButtons => {
                            onSortPress(multiButtons);
                            setIsSortModalVisible(state => !state);
                        }}
                    />
                }
            />
            <Modal
                onClose={() => setIsFilterModalVisible(state => !state)}
                isVisible={isFilterModalVisible}
                header='Filter by:'
                sheetBody={
                    <View style={styles.filterSheetContainer}>
                        {filterChipsLocal.map(item => (
                            <View
                                style={{ alignSelf: 'flex-start' }}
                                key={item.id}>
                                <Spacer height={5} />
                                <Text
                                    style={styles.filterSheetSubHeadings}
                                    type='ParaSMBold'>
                                    {item.title}
                                </Text>
                                <Spacer height={5} />
                                <ChipGroup
                                    chips={item.chips}
                                    onPress={chips => {
                                        filterChipsLocal.map(mapChip => {
                                            const selectedChip = mapChip;
                                            if (mapChip.id === item.id) {
                                                selectedChip.chips = chips;
                                            }
                                            return selectedChip;
                                        });
                                    }}
                                />
                                <Spacer height={5} />
                            </View>
                        ))}
                        <Spacer height={5} />
                        <Button
                            label='Apply'
                            mode='outlined'
                            labelStyle={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                setIsFilterModalVisible(state => !state);
                                onFilterPress(filterChipsLocal);
                            }}
                        />
                    </View>
                }
            />
        </>
    );
};

export default LAFilters;
