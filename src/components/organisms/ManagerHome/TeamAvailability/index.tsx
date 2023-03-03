import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getHttpTeamAvailability } from 'src/services/http';
import { usePersistStore } from 'src/store';
import { getformatDateToYyyyMmDd } from 'src/utils/helpers/dateHandler';
import {
    AvailableTeam,
    EmployeeType,
    SelectedTeam,
    Team,
} from 'src/utils/types';
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
import ViewAllMembersSheetBody from '../../TeamAvailability/ViewAllMembersSheetBody';

interface Props {
    isManagerTeamsInitialLoading: boolean;
    isManagerTeamsRefetching: boolean;
    managerTeams: Team[];
}

interface OpenAwayTeamDetailItem {
    isOpen: boolean;
    awayTeamImages: string[];
    awayTeamNames: string[];
}
const initialOpenAwayTeamDetailItem: OpenAwayTeamDetailItem = {
    isOpen: false,
    awayTeamImages: [],
    awayTeamNames: [],
};

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
    const [openAwayTeamDetailItemModal, setOpenAwayTeamDetailItemModal] =
        useState<OpenAwayTeamDetailItem>(initialOpenAwayTeamDetailItem);

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

    const onOpenDetailItemModal = (
        awayTeamImages: string[],
        awayTeamNames: string[],
    ) => {
        setTimeout(() => {
            setOpenAwayTeamDetailItemModal({
                isOpen: true,
                awayTeamImages,
                awayTeamNames,
            });
        }, 500);
    };
    const onCloseDetailItemModal = () => {
        setOpenAwayTeamDetailItemModal(initialOpenAwayTeamDetailItem);
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
            <>
                <LATeamAvContent
                    showAvailableTeamCount
                    availableTeamCount={onlineCount}
                    awayTeamImages={imageList}
                />
                <Modal
                    onClose={onCloseDetailItemModal}
                    isVisible={openAwayTeamDetailItemModal.isOpen}
                    header='All members'
                    sheetBody={
                        <ViewAllMembersSheetBody
                            awayTeam={[]}
                            imageList={availableTeam?.imageList}
                            nameList={availableTeam?.nameList}
                            onClose={onCloseDetailItemModal}
                        />
                    }
                    headerRightContent={
                        <View style={styles.headerRightContentBody}>
                            <Text>
                                {availableTeam?.nameList.length.toString()}
                            </Text>
                        </View>
                    }
                />
            </>
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
