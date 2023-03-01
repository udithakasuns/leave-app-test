import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Spacer } from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import {
    LATeamAvAvailableText,
    LATeamAvContainer,
    LATeamAvContent,
    LATeamAvHeader,
} from 'src/components/molecules/LATeamAvailability';
import { TeamAvailabilitySheetBody } from 'src/components/organisms';
import { getHttpAwayEmployees, getHttpTeamByUser } from 'src/services/http';
import { useUserStore } from 'src/store';
import {
    getformatDateToYyyyMmDd,
    getFormattedDay,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { EmployeeOnLeaveByDay, Team } from 'src/utils/types';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';

const { scale } = theme;

interface Props {
    startDate: string;
    endDate: string;
}

const TeamAvailability = ({ startDate, endDate }: Props) => {
    const [selectedTeam, setSelectedTeam] = useState<Team>({
        teamId: -1,
        teamName: '',
    });
    const {
        user: { userId },
    } = useUserStore();

    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);

    const onOpenDetailModal = () => setOpenDetailModal(true);
    const onCloseDetailModal = () => setOpenDetailModal(false);

    const onSelectTeam = (team: Team) => setSelectedTeam(team);

    const { data: employeeTeams, isLoading: isLoadingEmployeeTeams } = useQuery<
        Team[],
        AxiosError
    >(['fetchEmployeeTeams'], () => getHttpTeamByUser(userId), {
        keepPreviousData: true,
        onSuccess: teams => {
            if (teams.length > 0) {
                setSelectedTeam(teams[0]);
            }
        },
    });

    const {
        isLoading: availableTeamLoading,
        isRefetching: availableTeamRefetching,
        refetch: refetchAvailableTeam,
        data: availableTeam,
    } = useQuery<EmployeeOnLeaveByDay | null, AxiosError>(
        [selectedTeam, startDate, endDate],
        () => {
            if (selectedTeam.teamId !== -1) {
                return getHttpAwayEmployees({
                    startDate: getformatDateToYyyyMmDd(startDate),
                    endDate: getformatDateToYyyyMmDd(endDate || startDate),
                    teamId: selectedTeam.teamId,
                });
            }
            return null;
        },
        {
            keepPreviousData: true,
        },
    );
    useEffect(() => {
        refetchAvailableTeam();
    }, [selectedTeam, startDate, endDate]);

    if (isLoadingEmployeeTeams || !employeeTeams) {
        return <SkelitonLoaderFull />;
    }
    const isAllowToPressTeamAv = (): boolean => {
        if (
            availableTeam &&
            availableTeam.adminEmployeesOnLeaveByTeamDto.onLeaveCount !== 0
        ) {
            return true;
        }
        return false;
    };
    return (
        <>
            <LATeamAvContainer
                outline
                onPress={
                    isAllowToPressTeamAv() ? onOpenDetailModal : undefined
                }>
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
                            awayTeamList={
                                availableTeam.adminEmployeesOnLeaveByTeamDto
                                    .nameList
                            }
                            leaveDuration={
                                startDate && endDate
                                    ? `${getFormattedDay(
                                          startDate,
                                      )} to ${getFormattedDay(endDate)}`
                                    : getFormattedDay(startDate)
                            }
                        />
                        <Spacer height={scale.vsc2} />
                        <LATeamAvContent
                            showAvailableTeamCount
                            awayTeamImages={
                                availableTeam.adminEmployeesOnLeaveByTeamDto
                                    .imageList
                            }
                            availableTeamCount={
                                availableTeam.adminEmployeesOnLeaveByTeamDto
                                    .onlineCount
                            }
                        />
                    </>
                )}
            </LATeamAvContainer>
            <Modal
                onClose={onCloseDetailModal}
                isVisible={openDetailModal}
                header='Team availability'
                headerIcon='arrow-back'
                sheetBody={
                    <TeamAvailabilitySheetBody
                        awayTeamsByDate={
                            availableTeam?.employeeOnLeaveByDayResponseDtoList ||
                            []
                        }
                        onPressGoBack={onCloseDetailModal}
                    />
                }
            />
        </>
    );
};

export default TeamAvailability;
