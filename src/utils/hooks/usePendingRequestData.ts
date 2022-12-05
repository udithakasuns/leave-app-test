import { useQuery } from '@tanstack/react-query';
import { getHttpPendingRequest } from 'src/services/http';
import { getFormattedMonth } from '../helpers/dateHandler';
import { LeaveRequestParams, PendingRequestType, Section } from '../types';

export const usePendingRequestData = (
    params?: LeaveRequestParams,
    limit?: boolean,
    onSuccess?: (data: Section<PendingRequestType[]>[]) => void,
) =>
    useQuery(['pendingRequests', params], () => getHttpPendingRequest(params), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        onSuccess,
        select: json => {
            let isViewAllVisible = true;
            let requestItems: PendingRequestType[] = json[0].items;
            if (requestItems.length < 5) isViewAllVisible = false;
            if (limit) requestItems = requestItems.slice(0, 5);
            let monthTitles: string[] = requestItems.map(item =>
                getFormattedMonth(item.startDate),
            );
            let leaveRequestsData: Section<PendingRequestType[]>[];
            if (params?.sortKey === 'startDate') {
                monthTitles = monthTitles.filter(
                    (item, pos) => monthTitles.indexOf(item) === pos,
                );
                leaveRequestsData = monthTitles.map(
                    (item: string): Section<PendingRequestType[]> => ({
                        title: item,
                        isViewAllVisible,
                        data: requestItems.filter(
                            state =>
                                getFormattedMonth(state.startDate) === item,
                        ),
                    }),
                );
            } else {
                leaveRequestsData = requestItems.map(
                    (
                        item: PendingRequestType,
                    ): Section<PendingRequestType[]> => ({
                        title: getFormattedMonth(item.startDate),
                        isViewAllVisible,
                        data: requestItems.filter(state => state === item),
                    }),
                );
            }

            return leaveRequestsData;
        },
    });
