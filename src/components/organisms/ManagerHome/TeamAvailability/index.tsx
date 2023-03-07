import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { usePersistStore } from 'src/store';
import { SelectedTeam, Team } from 'src/utils/types';
import { LAErrorContent, Modal } from 'src/components/molecules';
import { Text } from 'src/components/atoms';
import {
    LATeamAvChipGroup,
    LATeamAvContainer,
    LATeamAvHeader,
} from 'src/components/molecules/LATeamAvailability';
import { TID } from 'src/utils/testIds';
import { SkelitonLoaderFull } from './SkelitonLoaders';
import { styles } from './styles';
import AddTeamSheetBody from '../LAManagerModals/AddTeamSheetBody';
import AvailabilityContent from './AvailabilityConent';

interface Props {
    isManagerTeamsInitialLoading: boolean;
    isManagerTeamsRefetching: boolean;
    isManagerTeamsNotFound: boolean;
    managerTeams: Team[];
}

const TeamAvailability = ({
    isManagerTeamsInitialLoading,
    isManagerTeamsRefetching,
    isManagerTeamsNotFound,
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
                    disableOnPressOption={isManagerTeamsNotFound}
                />

                {isManagerTeamsNotFound ? (
                    <LAErrorContent
                        title='No teams assigned'
                        subTitle='You have not been assigned a team to supervise yet. Please have a chat with the admin'
                    />
                ) : (
                    <>
                        <LATeamAvChipGroup
                            teams={selectedTeams}
                            onSelectTeam={onSelectTeam}
                        />
                        <View style={styles.conentContainer}>
                            <Text testID={`${TID}TEXT_TEAM_AVAILABLITY_TODAY`}>
                                TODAY
                            </Text>
                            <AvailabilityContent
                                selectedTeams={selectedTeams}
                                isManagerTeamsRefetching={
                                    isManagerTeamsRefetching
                                }
                            />
                        </View>
                    </>
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

export default TeamAvailability;
