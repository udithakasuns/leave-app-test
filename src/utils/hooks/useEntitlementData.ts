import { useQuery } from '@tanstack/react-query';
import { getHttpEntitlements } from 'src/services/http';
import { Entitlement } from '../types';

export const useEntitlementData = (onSuccess: (data: Entitlement[]) => void) =>
    useQuery<Entitlement[]>(['entitlements'], getHttpEntitlements, {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        select: json => {
            const jsonData: Entitlement[] = json;
            return jsonData;
        },
        onSuccess,
    });
