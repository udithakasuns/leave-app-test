import { useQuery } from '@tanstack/react-query';
import { getHttpLeaveRequest } from 'src/services/http';
import { getFormattedMonth } from '../helpers/dateHandler';
import { LeaveRequestParams, LeaveRequestType, Section } from '../types';

export const useLeaveRequestData = (params?: LeaveRequestParams) =>
    useQuery(['leaveRequests', params], () => getHttpLeaveRequest(params), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        select: json => {
            const requestItems: LeaveRequestType[] = json[0].items;
            const monthTitles: string[] = requestItems.map(item =>
                getFormattedMonth(item.startDate),
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
