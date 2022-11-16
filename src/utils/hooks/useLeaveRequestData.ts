import { useQuery } from '@tanstack/react-query';
import { getHttpLeaveRequest } from 'src/services/http';
import { getFormattedMonth } from '../helpers/dateHandler';
import { LeaveRequestParams, LeaveRequestType, Section } from '../types';

export const useLeaveRequestData = (
    params?: LeaveRequestParams,
    limit?: boolean,
) =>
    useQuery(['leaveRequests', params], () => getHttpLeaveRequest(params), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        select: json => {
            let requestItems: LeaveRequestType[] = json[0].items;
            if (limit) requestItems = requestItems.slice(0, 5);
            let monthTitles: string[] = requestItems.map(item =>
                getFormattedMonth(item.startDate),
            );
            monthTitles = monthTitles.filter(
                (item, pos) => monthTitles.indexOf(item) === pos,
            );
            const leaveRequestsData: Section[] = monthTitles.map(
                (item: string): Section => ({
                    title: item,
                    data: requestItems.filter(
                        state => getFormattedMonth(state.startDate) === item,
                    ),
                }),
            );
            return leaveRequestsData;
        },
    });
