import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getHttpFilterTypes } from 'src/services/http';
import { FilterTypes } from '../types';

export const useFilterTypesData = (
    filterByInUse: boolean,
    onSuccess: (data: FilterTypes[]) => void,
) =>
    useQuery<FilterTypes[], AxiosError>(
        ['filterTypes'],
        () => getHttpFilterTypes(filterByInUse),
        {
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            onSuccess,
        },
    );
