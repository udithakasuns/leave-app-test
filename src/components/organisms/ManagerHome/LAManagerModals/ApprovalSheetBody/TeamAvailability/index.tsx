import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
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
import {
    getCalendarRangeDate,
    getformatDateToYyyyMmDd,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import {
    AvailableTeam,
    EmployeeOnLeaveByDay,
    PendingRequestByID,
    Team,
} from 'src/utils/types';
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
    } = useQuery<EmployeeOnLeaveByDay, AxiosError>(
        [selectedTeam],
        () =>
            getHttpAwayEmployees({
                startDate: getformatDateToYyyyMmDd(requestDetails.startDate),
                endDate: getformatDateToYyyyMmDd(
                    requestDetails.endDate
                        ? requestDetails.endDate
                        : requestDetails.startDate,
                ),
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
            <LATeamAvContainer
                outline
                onPress={
                    availableTeam?.adminEmployeesOnLeaveByTeamDto
                        .onLeaveCount !== 0
                        ? onOpenDetailModal
                        : () => {}
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
                            leaveDuration={getCalendarRangeDate(
                                requestDetails.startDate,
                                requestDetails.endDate,
                            )}
                        />
                        <Spacer height={scale.vsc2} />
                        <LATeamAvContent
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
