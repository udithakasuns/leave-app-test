/* eslint-disable import/no-cycle */
import React from 'react';
import { View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { ChipGroup } from 'src/components/molecules';
import { FilterChipsProps, ResetOptions } from '.';
import { styles } from './styles';

const FilterSheetBody = ({
    resetOption,
    filterChipsLocal,
    onFilterPress,
    setRestOption,
}: {
    resetOption: ResetOptions;
    filterChipsLocal: FilterChipsProps[];
    onFilterPress: (multiButtons: FilterChipsProps[]) => void;
    setRestOption: React.Dispatch<React.SetStateAction<ResetOptions>>;
}) => (
    <View style={styles.filterSheetContainer}>
        {!resetOption.resetData &&
            filterChipsLocal.map(item => (
                <View style={styles.chipsContainer} key={item.id}>
                    <Spacer height={5} />
                    <Text
                        style={styles.filterSheetSubHeadings}
                        type='ParaSMBold'>
                        {item.title}
                    </Text>
                    <Spacer height={5} />
                    <ChipGroup
                        chips={item.chips}
                        singleSelection={item.singleSelection}
                        onPress={chips => {
                            filterChipsLocal.map(mapChip => {
                                const selectedChip = mapChip;
                                if (mapChip.id === item.id) {
                                    selectedChip.chips = chips;
                                    setRestOption({
                                        ...resetOption,
                                        resetEnable: true,
                                    });
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
            labelStyle={styles.commonPadding}
            onPress={() => {
                onFilterPress(filterChipsLocal);
            }}
        />
        {resetOption.resetEnable &&
            !filterChipsLocal.every(item => {
                if (item.chips.filter(chip => chip.selected).length > 0) {
                    return false;
                }
                return true;
            }) && (
                <>
                    <Spacer height={5} />
                    <Button
                        label='Reset Filters'
                        mode='contained-gray'
                        labelStyle={styles.commonPadding}
                        onPress={() =>
                            setRestOption({
                                ...resetOption,
                                resetData: true,
                            })
                        }
                    />
                </>
            )}
    </View>
);

export default FilterSheetBody;
