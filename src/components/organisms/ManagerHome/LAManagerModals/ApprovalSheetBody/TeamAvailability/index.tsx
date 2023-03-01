import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Spacer } from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import {
    LATeamAvAvailableText,
    LATeamAvContainer,
    LATeamAvContent,
    LATeamAvHeader,
    LATeamAvNoDataContent,
} from 'src/components/molecules/LATeamAvailability';
import { TeamAvailabilitySheetBody } from 'src/components/organisms';
import { getHttpAwayEmployees, getHttpTeamByUser } from 'src/services/http';
import {
    getCalendarRangeDate,
    getformatDateToYyyyMmDd,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import {
    EmployeeOnLeaveByDay,
    PendingRequestByID,
    Team,
} from 'src/utils/types';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';
import { styles } from './styles';

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
    } = useQuery<EmployeeOnLeaveByDay | null, AxiosError>(
        [selectedTeam],
        () => {
            if (selectedTeam.teamId !== -1 && requestDetails) {
                return getHttpAwayEmployees({
                    startDate: getformatDateToYyyyMmDd(
                        requestDetails.startDate,
                    ),
                    endDate: getformatDateToYyyyMmDd(
                        requestDetails.endDate
                            ? requestDetails.endDate
                            : requestDetails.startDate,
                    ),
                    teamId: selectedTeam.teamId,
                });
            }
            return null;
        },
        {
            keepPreviousData: true,
        },
    );

    const getTeamAvailabilityContent = () => {
        if (availableTeamLoading || availableTeamRefetching || !availableTeam) {
            return <SkelitonLoaderContent />;
        }
        const { imageList, nameList, onLeaveCount, onlineCount } =
            availableTeam.adminEmployeesOnLeaveByTeamDto;
        if (onLeaveCount === 0 && onlineCount === 0) {
            return <LATeamAvNoDataContent />;
        }
        return (
            <>
                <LATeamAvAvailableText
                    awayTeamList={nameList}
                    leaveDuration={getCalendarRangeDate(
                        requestDetails.startDate,
                        requestDetails.endDate,
                    )}
                />
                <Spacer height={scale.vsc2} />
                <LATeamAvContent
                    awayTeamImages={imageList}
                    availableTeamCount={onlineCount}
                />
            </>
        );
    };

    const isAllowToPressTeamAv = (): boolean => {
        if (
            availableTeam &&
            availableTeam.adminEmployeesOnLeaveByTeamDto.onLeaveCount !== 0
        ) {
            return true;
        }
        return false;
    };

    const onOpenDetailModal = () => setOpenDetailModal(true);
    const onCloseDetailModal = () => setOpenDetailModal(false);

    if (isLoadingEmployeeTeams || !employeeTeams) {
        return <SkelitonLoaderFull />;
    }

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
                <View style={styles.conentContainer}>
                    {getTeamAvailabilityContent()}
                </View>
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
