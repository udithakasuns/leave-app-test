import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Spacer } from 'src/components/atoms';
import {
    LATeamAvAvailableText,
    LATeamAvContainer,
    LATeamAvContent,
    LATeamAvHeader,
} from 'src/components/molecules/LATeamAvailability';
import { getHttpAwayEmployees, getHttpTeamByUser } from 'src/services/http';
import {
    getCalendarRangeDate,
    getformatDateToYyyyMmDd,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { AvailableTeam, PendingRequestByID, Team } from 'src/utils/types';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';

const { scale } = theme;

interface Props {
    requestDetails: PendingRequestByID;
}

const TeamAvailability = ({ requestDetails }: Props) => {
    const [selectedTeam, setSelectedTeam] = useState<Team>({
        teamId: -1,
        teamName: '',
    });

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);

    const onOpenDetailModal = () => setOpenDetailModal(true);
    const onCloseDetailModal = () => setOpenDetailModal(false);

    const onSelectTeam = (team: Team) => setSelectedTeam(team);

    const { data: employeeTeams, isLoading: isLoadingEmployeeTeams } = useQuery<
        Team[],
        AxiosError
    >(
        ['fetchEmployeeTeams', requestDetails],
        () => getHttpTeamByUser(requestDetails.employee.employeeId),
        {
            keepPreviousData: true,
            onSuccess: teams => {
                if (teams.length > 0) {
                    setSelectedTeam(teams[0]);
                }
            },
        },
    );

    const {
        isLoading: availableTeamLoading,
        isRefetching: availableTeamRefetching,
        data: availableTeam,
    } = useQuery<AvailableTeam, AxiosError>(
        [selectedTeam],
        () =>
            getHttpAwayEmployees({
                startDate: getformatDateToYyyyMmDd(requestDetails.startDate),
                endDate: getformatDateToYyyyMmDd(requestDetails.startDate),
                teamId: selectedTeam.teamId,
            }),
        {
            keepPreviousData: true,
        },
    );

    if (isLoadingEmployeeTeams || !employeeTeams) {
        return <SkelitonLoaderFull />;
    }

    return (
        <>
            <LATeamAvContainer outline onPress={onOpenDetailModal}>
                <LATeamAvHeader
                    headerType='teamSelector'
                    teams={employeeTeams}
                    selectedTeam={selectedTeam}
                    onSelectTeam={onSelectTeam}
                />
                <Spacer height={scale.vsc2} />
                {availableTeamLoading ||
                availableTeamRefetching ||
                !availableTeam ? (
                    <SkelitonLoaderContent />
                ) : (
                    <>
                        <LATeamAvAvailableText
                            awayTeamList={availableTeam.nameList}
                            leaveDuration={getCalendarRangeDate(
                                requestDetails.startDate,
                                requestDetails.endDate,
                            )}
                        />
                        <Spacer height={scale.vsc2} />
                        <LATeamAvContent
                            awayTeamImages={availableTeam.imageList}
                            availableTeamCount={availableTeam.onlineCount}
                        />
                    </>
                )}
            </LATeamAvContainer>
            {/* Detail Modal Should be here */}
        </>
    );
};

export default TeamAvailability;
