import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { getHttpTeamAvailability } from 'src/services/http';
import { usePersistStore } from 'src/store';
import { getformatDateToYyyyMmDd } from 'src/utils/helpers/dateHandler';
import { AvailableTeam, SelectedTeam, Team } from 'src/utils/types';
import { Modal } from 'src/components/molecules';
import { Spacer, Text } from 'src/components/atoms';
import {
    LATeamAvChipGroup,
    LATeamAvContainer,
    LATeamAvContent,
    LATeamAvHeader,
} from 'src/components/molecules/LATeamAvailability';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';

import AddTeamSheetBody from '../../ManagerHome/LAManagerModals/AddTeamSheetBody';

interface Props {
    isManagerTeamsLoading: boolean;
    managerTeams: Team[];
}

const LATeamAvManagerHome = ({
    isManagerTeamsLoading,
    managerTeams,
}: Props) => {
    const {
        manager: { filteredTeams },
        setManagerFilteredTeams,
    } = usePersistStore();

    const [selectedTeams, setSelectedTeams] = useState<SelectedTeam[]>([]);
    const [openAddTeamModal, setAddTeamModal] = useState<boolean>(false);

    const onOpenAddTeamModal = () => setAddTeamModal(true);
    const onCloseAddTeamModal = () => setAddTeamModal(false);

    const onSetFilteredTeams = () => {
        if (filteredTeams.length === 0) {
            // Set 1st 3 teams set to the persist store
            setManagerFilteredTeams([...managerTeams.slice(0, 3)]);
            setSelectedTeams(
                managerTeams.map((team, index) => ({
                    ...team,
                    recentlySelected: index === 0,
                })),
            );
        } else {
            setSelectedTeams(
                filteredTeams.map((team, index) => ({
                    ...team,
                    recentlySelected: index === 0,
                })),
            );
        }
    };

    const onSelectTeam = (team: SelectedTeam) => {
        selectedTeams.forEach((selectedTeam, index) => {
            if (selectedTeam.teamId === team.teamId) {
                selectedTeams[index].recentlySelected = true;
            } else {
                selectedTeams[index].recentlySelected = false;
            }
        });
        setSelectedTeams([...selectedTeams]);
    };

    const {
        isLoading: availableTeamLoading,
        isRefetching: availableTeamRefetching,
        data: availableTeam,
    } = useQuery<AvailableTeam, AxiosError>(
        [selectedTeams],
        () =>
            getHttpTeamAvailability({
                date: getformatDateToYyyyMmDd(new Date().toString()),
                teamIds: [
                    selectedTeams.find(team => team.recentlySelected)?.teamId ||
                        -1,
                ],
            }),
        {
            keepPreviousData: true,
        },
    );

    useEffect(() => {
        onSetFilteredTeams();
    }, [filteredTeams]);

    if (isManagerTeamsLoading || !availableTeam) {
        return <SkelitonLoaderFull />;
    }

    return (
        <>
            <LATeamAvContainer>
                <LATeamAvHeader
                    headerType='options'
                    onPressOption={onOpenAddTeamModal}
                />
                <LATeamAvChipGroup
                    teams={selectedTeams}
                    onSelectTeam={onSelectTeam}
                />
                <Spacer height={5} />
                <Text>TODAY</Text>
                {availableTeamLoading || availableTeamRefetching ? (
                    <SkelitonLoaderContent />
                ) : (
                    <LATeamAvContent
                        availableTeamCount={availableTeam.onlineCount}
                        awayTeamImages={availableTeam.imageList}
                    />
                )}
            </LATeamAvContainer>
            <Modal
                onClose={onCloseAddTeamModal}
                isVisible={openAddTeamModal}
                header='Add team'
                sheetBody={
                    <AddTeamSheetBody
                        allTeams={managerTeams}
                        onClose={onCloseAddTeamModal}
                    />
                }
            />
        </>
    );
};

export default LATeamAvManagerHome;
