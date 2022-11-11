import { useQuery } from '@tanstack/react-query';
import { getHttpFilterTypes } from 'src/services/http';
import { FilterTypes } from '../types';

export const useFilterTypesData = () =>
    useQuery<FilterTypes[]>(['filterTypes'], getHttpFilterTypes, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });
