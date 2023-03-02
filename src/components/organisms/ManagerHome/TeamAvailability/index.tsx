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
    LATeamAvNoDataContent,
} from 'src/components/molecules/LATeamAvailability';
import { TID } from 'src/utils/testIds';
import { SkelitonLoaderFull, SkelitonLoaderContent } from './SkelitonLoaders';
import { styles } from './styles';

import AddTeamSheetBody from '../LAManagerModals/AddTeamSheetBody';

interface Props {
    isManagerTeamsInitialLoading: boolean;
    isManagerTeamsRefetching: boolean;
    managerTeams: Team[];
}

const TeamAvailability = ({
    isManagerTeamsInitialLoading,
    isManagerTeamsRefetching,
    managerTeams,
}: Props) => {
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
    } = useQuery<AvailableTeam | null, AxiosError>(
        [selectedTeams, isManagerTeamsRefetching],
        () => {
            if (!isManagerTeamsRefetching) {
                return getHttpTeamAvailability({
                    date: getformatDateToYyyyMmDd(new Date().toString()),
                    teamIds: [
                        selectedTeams.find(team => team.recentlySelected)
                            ?.teamId || -1,
                    ],
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
        const { imageList, onLeaveCount, onlineCount } = availableTeam;
        if (onlineCount === 0 && onLeaveCount === 0) {
            return <LATeamAvNoDataContent />;
        }
        if (onLeaveCount === 0) {
            return <LATeamAvAvailableText awayTeamList={[]} leaveDuration='' />;
        }
        return (
            <LATeamAvContent
                showAvailableTeamCount
                availableTeamCount={onlineCount}
                awayTeamImages={imageList}
            />
        );
    };

    useEffect(() => {
        if (filteredTeams) {
            onSetSelectedTeam();
        }
    }, [filteredTeams]);

    if (isManagerTeamsInitialLoading || !managerTeams) {
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
