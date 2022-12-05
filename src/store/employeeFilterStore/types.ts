import { MultiButtonProps } from 'src/components/molecules';
import { FilterChipsProps, LeaveRequestParams } from 'utils/types';

export type FilterUtils = {
    isFilterButtonsVisible: boolean;
    isFiltersSelected: boolean;
};

export interface State {
    sortByButtons: MultiButtonProps[];
    filterChips: FilterChipsProps[];
    params: LeaveRequestParams;
    filterUtils: FilterUtils;
}

export type Actions = {
    setSortByButtons: (multiButtons: MultiButtonProps[]) => void;
    updateSortByParams: (multiButtons: MultiButtonProps[]) => void;
    setFilterChips: (filterChips: FilterChipsProps[]) => void;
    updateFilterParams: (filterChips: FilterChipsProps[]) => void;
    resetFiltersParams: () => void;
    setParams: (params: LeaveRequestParams) => void;
    setEmptyFilterUtils: () => void;
    resetFilterUtils: () => void;
};
