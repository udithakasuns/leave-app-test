import { MultiChipProps } from 'src/components/molecules';
import { FilterChipsProps } from 'src/components/organisms/Global/LAFilters';
import { Status } from '../types';

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

export const filterChips: FilterChipsProps[] = [
    {
        id: 1,
        title: 'Leave Status',
        chips: leaveStatusChips,
    },
];
