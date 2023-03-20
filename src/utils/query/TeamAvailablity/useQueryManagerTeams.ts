import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getHttpTeamByUser } from 'src/services/http';
import { usePersistStore, useUserStore } from 'src/store';
import { Team } from 'src/utils/types';

/*
    Since this query needs to be called in multiple places, 
    This is defined as global query.
*/

interface Props {
    enableQuery?: boolean;
}

interface ReturnProps {
    managerTeams: Team[] | undefined;
    onRefetchManagerTeams: () => void;
    isRefetchingManagerTeams: boolean;
    isInitialLoadingManagerTeams: boolean;
    isManagerTeamError: boolean;
}

const useQueryManagerTeams = ({ enableQuery = false }: Props): ReturnProps => {
    const {
        user: { userId },
    } = useUserStore();

    const {
        manager: { filteredTeams },
        setManagerFilteredTeams,
    } = usePersistStore();

    const {
        data: managerTeams,
        refetch: onRefetchManagerTeams,
        isRefetching: isRefetchingManagerTeams,
        isInitialLoading: isInitialLoadingManagerTeams,
        isError: isManagerTeamError,
    } = useQuery<Team[], AxiosError>(
        ['fetchManagerTeams'],
        () => getHttpTeamByUser(userId),
        {
            keepPreviousData: true,
            enabled: enableQuery,
            onSuccess: teams => {
                /* 
                    Manager selected teams will keep in persist store since the app allow manager to reorganize teams.
                    So, even the manager exist from the app and come back, same order will be there unless his teams have not being 
                    changed from the backend. 
                */
                if (
                    !filteredTeams ||
                    filteredTeams.length === 0 ||
                    filteredTeams !== teams
                ) {
                    setManagerFilteredTeams(teams);
                }
            },
        },
    );

    return {
        managerTeams,
        onRefetchManagerTeams,
        isRefetchingManagerTeams,
        isInitialLoadingManagerTeams,
        isManagerTeamError,
    };
};

export default useQueryManagerTeams;
