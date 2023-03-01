import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getHttpTeamAvailability } from 'src/services/http';
import { usePersistStore } from 'src/store';
import { getformatDateToYyyyMmDd } from 'src/utils/helpers/dateHandler';
import { AvailableTeam, SelectedTeam, Team } from 'src/utils/types';
import { Modal } from 'src/components/molecules';
import { Text } from 'src/components/atoms';
import {
    LATeamAvAvailableText,
    LATeamAvChipGroup,
    LATeamAvContainer,
    LATeamAvContent,
    LATeamAvHeader,
} from 'src/components/molecules/LATeamAvailability';
import { TID } from 'src/utils/testIds';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';
import { styles } from './styles';

import AddTeamSheetBody from '../LAManagerModals/AddTeamSheetBody';

interface Props {
    isManagerTeamsLoading: boolean;
    managerTeams: Team[];
}

const TeamAvailability = ({ isManagerTeamsLoading, managerTeams }: Props) => {
    const {
        manager: { filteredTeams },
    } = usePersistStore();

    const [selectedTeams, setSelectedTeams] = useState<SelectedTeam[]>([]);
    const [openAddTeamModal, setAddTeamModal] = useState<boolean>(false);

    const onSetSelectedTeam = () => {
        setSelectedTeams(
            filteredTeams.map((team, index) => ({
                ...team,
                recentlySelected: index === 0,
            })),
        );
    };

    const onOpenAddTeamModal = () => setAddTeamModal(true);
    const onCloseAddTeamModal = () => setAddTeamModal(false);

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

    const getTeamAvailabilityContent = () => {
        if (availableTeamLoading || availableTeamRefetching || !availableTeam) {
            return <SkelitonLoaderContent />;
        }
        if (availableTeam.onLeaveCount === 0) {
            return <LATeamAvAvailableText awayTeamList={[]} leaveDuration='' />;
        }
        return (
            <LATeamAvContent
                showAvailableTeamCount
                availableTeamCount={availableTeam.onlineCount}
                awayTeamImages={availableTeam.imageList}
            />
        );
    };

    useEffect(() => {
        if (filteredTeams) {
            onSetSelectedTeam();
        }
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

                <View style={styles.conentContainer}>
                    <Text testID={`${TID}TEXT_TEAM_AVAILABLITY_TODAY`}>
                        TODAY
                    </Text>
                    {getTeamAvailabilityContent()}
                </View>
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

export default TeamAvailability;
