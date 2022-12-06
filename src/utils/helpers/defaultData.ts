import { MultiButtonProps, MultiChipProps } from 'src/components/molecules';
import { FilterChipsProps, FilterDates, Status } from '../types';

const leaveStatusChips: MultiChipProps[] = [
    {
        chipId: 1,
        content: 'Pending',
        chipInfo: Status.PENDING,
    },
    {
        chipId: 2,
        content: 'Approved',
        chipInfo: Status.APPROVED,
    },
    {
        chipId: 3,
        content: 'Denied',
        chipInfo: Status.DENIED,
    },
];

const dateChips: MultiChipProps[] = [
    {
        chipId: 1,
        content: 'Today',
        chipInfo: FilterDates.TODAY,
    },
    {
        chipId: 2,
        content: 'This week',
        chipInfo: FilterDates.WEEK,
    },
    {
        chipId: 3,
        content: 'This month',
        chipInfo: FilterDates.MONTH,
    },
];

export const filterChipsEmployee: FilterChipsProps[] = [
    {
        id: 1,
        title: 'Leave Status',
        chips: leaveStatusChips,
    },
];

export const filterChipsManager: FilterChipsProps[] = [
    {
        id: 1,
        title: 'Leave Status',
        chips: leaveStatusChips,
    },
    {
        id: 3,
        title: 'Date',
        chips: dateChips,
        singleSelection: true,
    },
];

export const sortByButtonsEmployee: MultiButtonProps[] = [
    {
        buttonId: 1,
        label: 'Date Requested',
        selected: true,
    },
    {
        buttonId: 2,
        label: 'Leave Date',
    },
];

export const sortByButtonsManager: MultiButtonProps[] = [
    {
        buttonId: 1,
        label: 'Date Requested',
        selected: true,
    },
    {
        buttonId: 2,
        label: 'Leave Date',
    },
];
