/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import {
    FilterButtons,
    Modal,
    MultiButtonProps,
    MultiChipProps,
} from 'src/components/molecules';
import FilterSheetBody from './FilterSheetBody';
import SortSheetBody from './SortSheetBody';

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

export type ResetOptions = {
    resetEnable: boolean;
    resetData: boolean;
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

    const [resetOption, setRestOption] = useState<ResetOptions>({
        resetData: false,
        resetEnable: false,
    });

    const getSortByLabel = () => {
        const selectedButton = sortByButtons.filter(
            btn => btn.selected === true,
        )[0];
        return selectedButton.label;
    };

    useEffect(() => {
        const chipsDeepClone = JSON.parse(JSON.stringify(filterChips));
        setFilterChipsLocal(chipsDeepClone);
        const isChipSelected = filterChips.every(item => {
            if (item.chips.filter(chip => chip.selected).length > 0) {
                return false;
            }
            return true;
        });
        setRestOption({
            ...resetOption,
            resetEnable: !isChipSelected,
        });
    }, [isFilterModalVisible]);

    useEffect(() => {
        if (resetOption.resetData) {
            const restedFilterChips = filterChipsLocal.map(item => {
                item.chips.map(chip => {
                    const tempChip = chip;
                    tempChip.selected = false;
                    return tempChip;
                });
                return item;
            });
            setFilterChipsLocal([...restedFilterChips]);
            setRestOption({
                ...resetOption,
                resetData: false,
            });
        }
    }, [resetOption.resetData]);

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
                    <FilterSheetBody
                        filterChipsLocal={filterChipsLocal}
                        onFilterPress={onFilterPress}
                        resetOption={resetOption}
                        setIsFilterModalVisible={setIsFilterModalVisible}
                        setRestOption={setRestOption}
                    />
                }
            />
        </>
    );
};

export default LAFilters;
