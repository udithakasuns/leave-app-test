import React from 'react';
import { View } from 'react-native';
import { Chip } from 'src/components/atoms';
import { Team } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    teams: Team[];
    onRemoveTeam: (team: Team) => void;
}

const SelectedTeams = ({ teams, onRemoveTeam }: Props) => (
    <View style={styles.container}>
        {teams.map(team => (
            <Chip
                key={team.teamId}
                content={team.teamName}
                containerStyle={styles.chipContainer}
                rightIconName='close'
                outline
                onPressRight={() => onRemoveTeam(team)}
            />
        ))}
    </View>
);

export default SelectedTeams;
