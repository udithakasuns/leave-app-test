import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { usePersistStore } from 'src/store';
import { SelectedTeam, Team } from 'src/utils/types';
// eslint-disable-next-line import/no-cycle
import { TeamAvailabilityFilterHeader2 } from '../..';

interface Props {
    isLoading: boolean; // toSet Skeliton Loader
    allTeams: Team[];
}

const LAManagerTeamAvailability = ({ isLoading, allTeams }: Props) => {
    const {
        manager: { selectedTeams },
        setManagerTeams,
    } = usePersistStore();

    const getSelectedTeams = () => {
        if (selectedTeams.length === 0) {
            const newSelectedTeams: SelectedTeam[] = allTeams
                .slice(0, 3)
                .map((team, index) => ({
                    ...team,
                    recentlySelected: index === 0,
                }));
            setManagerTeams([...newSelectedTeams]);
        }
    };

    const onSelectTeam = (selectedTeam: SelectedTeam) => {
        const newSelectedTeams = selectedTeams.map(team => ({
            ...team,
            recentlySelected: team.teamId === selectedTeam.teamId,
        }));
        setManagerTeams([...newSelectedTeams]);
    };

    useEffect(() => {
        getSelectedTeams();
    }, []);

    const awayTeamMembersDetails = [
        {
            id: '1',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '2',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '3',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '1',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '2',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '3',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '2',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
        {
            id: '3',
            uri: 'https://lh3.googleusercontent.com/a/AEdFTp7RTGB3Od_-3cj8GqW7Ct0on2HY79Qpv0rXhgEJ=s96-c',
        },
    ];

    return (
        <TeamAvailabilityFilterHeader2
            allTeams={allTeams}
            teams={selectedTeams}
            onSelectTeam={onSelectTeam}
            isTAforApproveLeave={false}
            onExpandTeamAvailability={() => {
                Alert.alert('Expand view');
            }}
            teamChipsList={[]}
            awayTeamMembersDetails={awayTeamMembersDetails}
            // isTAforApproveLeave={false}
        />
    );
};

export default LAManagerTeamAvailability;
