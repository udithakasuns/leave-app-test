import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getHttpPendingRequest } from 'src/services/http';
import { LeaveRequestParams, Page, PendingRequestType } from '../types';

export const usePendingRequestData = (
    params?: LeaveRequestParams,
    onSuccess?: (data: Page<PendingRequestType[]>) => void,
) =>
    useQuery(['pendingRequests', params], () => getHttpPendingRequest(params), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        onSuccess,
    });

export const useAllPendingRequestData = (params?: LeaveRequestParams) =>
    useInfiniteQuery({
        queryKey: ['allPendingRequests', params],
        queryFn: ({ pageParam = 0 }) =>
            getHttpPendingRequest({ ...params, page: pageParam }),
        getNextPageParam: lastPageData => {
            if (lastPageData.totalPages - 1 > lastPageData.currentPage) {
                return lastPageData.currentPage + 1;
            }
            return null;
        },
    });
