import { useQuery } from '@tanstack/react-query';
import { getHttpLeaveRequest } from 'src/services/http';
import { getFormattedMonth } from '../helpers/dateHandler';
import { LeaveRequestParams, LeaveRequestType, Section } from '../types';

export const useLeaveRequestData = (
    params?: LeaveRequestParams,
    limit?: boolean,
    onSuccessCallback?: (data: Section<LeaveRequestType[]>[]) => void,
) =>
    useQuery(['leaveRequests', params], () => getHttpLeaveRequest(params), {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        onSuccess: onSuccessCallback,
        select: json => {
            let isViewAllVisible = true;
            let requestItems: LeaveRequestType[] = json[0].items;
            if (requestItems.length < 5) isViewAllVisible = false;
            if (limit) requestItems = requestItems.slice(0, 5);
            let monthTitles: string[] = requestItems.map(item =>
                getFormattedMonth(item.startDate),
            );
            let leaveRequestsData: Section<LeaveRequestType[]>[];
            if (params?.sortKey === 'startDate') {
                monthTitles = monthTitles.filter(
                    (item, pos) => monthTitles.indexOf(item) === pos,
                );
                leaveRequestsData = monthTitles.map(
                    (item: string): Section<LeaveRequestType[]> => ({
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
                    (item: LeaveRequestType): Section<LeaveRequestType[]> => ({
                        title: getFormattedMonth(item.startDate),
                        isViewAllVisible,
                        data: requestItems.filter(state => state === item),
                    }),
                );
            }
            // monthTitles = monthTitles.filter(
            //     (item, pos) => monthTitles.indexOf(item) === pos,
            // );
            // const leaveRequestsData: Section<LeaveRequestType[]>[] =
            //     monthTitles.map(
            //         (item: string): Section<LeaveRequestType[]> => ({
            //             title: item,
            //             isViewAllVisible: true,
            //             data: requestItems.filter(
            //                 state =>
            //                     getFormattedMonth(state.startDate) === item,
            //             ),
            //         }),
            //     );
            return leaveRequestsData;
        },
    });
