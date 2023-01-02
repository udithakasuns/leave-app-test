import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getHttpLeaveRequest } from 'src/services/http';
import { LeaveRequestParams, LeaveRequestType, Page } from '../types';

export const useLeaveRequestData = (
    params?: LeaveRequestParams,
    onSuccessCallback?: (data: Page<LeaveRequestType[]>) => void,
) =>
    useQuery(
        ['leaveRequests', params],
        () => getHttpLeaveRequest({ ...params, size: 5 }),
        {
            refetchOnMount: true,
            refetchOnWindowFocus: true,
            onSuccess: onSuccessCallback,
        },
    );

export const useAllLeaveRequestData = (params?: LeaveRequestParams) =>
    useInfiniteQuery({
        queryKey: ['leaveRequestsPagination', params],
        queryFn: ({ pageParam = 0 }) =>
            getHttpLeaveRequest({ ...params, page: pageParam }),
        getNextPageParam: lastPageData => {
            if (lastPageData.totalPages - 1 > lastPageData.currentPage) {
                return lastPageData.currentPage + 1;
            }
            return null;
        },
    });
