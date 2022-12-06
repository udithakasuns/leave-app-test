import create from 'zustand';
import { MultiButtonProps } from 'src/components/molecules';
import { FilterChipsProps, LeaveRequestParams } from 'src/utils/types';
import { State, Actions } from './types';

const initialState: State = {
    sortByButtons: [],
    filterChips: [],
    params: {
        sortKey: 'creationDate',
    },
    filterUtils: {
        isFilterButtonsVisible: true,
        isFiltersSelected: false,
    },
};

const employeeFilterStore = create<State & Actions>((set, get) => ({
    ...initialState,
    setSortByButtons: (sortByButtons: MultiButtonProps[]) =>
        set(state => ({
            ...state,
            sortByButtons,
        })),
    updateSortByParams: (sortByButtons: MultiButtonProps[]) => {
        const selectedButton = sortByButtons.filter(
            btn => btn.selected === true,
        )[0];
        const sortKey =
            selectedButton.buttonId === 1 ? 'creationDate' : 'startDate';
        set(state => ({
            ...state,
            params: {
                ...get().params,
                sortKey,
            },
        }));
    },
    setFilterChips: (filterChips: FilterChipsProps[]) => {
        filterChips.sort((prev, curr) => prev.id - curr.id);
        set(state => ({
            ...state,
            filterChips,
        }));
    },
    updateFilterParams: (filterChips: FilterChipsProps[]) => {
        const leaveStatusChipsData = filterChips.filter(item => item.id === 1);
        const leaveTypeChipsData = filterChips.filter(item => item.id === 2);
        const selectedLeaveStatus = leaveStatusChipsData[0].chips
            .filter(item => item.selected)
            .map(item => item.chipInfo);
        const selectedLeaveTypes = leaveTypeChipsData[0].chips
            .filter(item => item.selected)
            .map(item => item.chipId);

        set(state => ({
            ...state,
            params: {
                ...get().params,
                status: selectedLeaveStatus.toString(),
                leaveType: selectedLeaveTypes.toString(),
            },
            filterChips,
            filterUtils: {
                ...get().filterUtils,
                isFiltersSelected: true,
            },
        }));
    },
    resetFiltersParams: () => {
        const restedFilterChips = get().filterChips.map(item => {
            item.chips.map(chip => {
                const tempChip = chip;
                tempChip.selected = false;
                return tempChip;
            });
            return item;
        });
        set(state => ({
            ...state,
            params: {
                ...initialState.params,
                sortKey: get().params.sortKey,
            },
            filterUtils: {
                ...get().filterUtils,
                isFilterButtonsVisible: true,
                isViewAllVisible: true,
            },
            filterChips: [...restedFilterChips],
        }));
    },
    setParams: (params: LeaveRequestParams) => {
        set(state => ({
            ...state,
            params,
        }));
    },
    setEmptyFilterUtils: () => {
        set(state => ({
            ...state,
            filterUtils: {
                ...get().filterUtils,
                isFilterButtonsVisible: false,
                isViewAllVisible: false,
            },
        }));
    },
    resetFilterUtils: () => {
        set(state => ({
            ...state,
            filterUtils: {
                ...get().filterUtils,
                isFilterButtonsVisible: true,
                isViewAllVisible: true,
            },
        }));
    },
}));

export default employeeFilterStore;
