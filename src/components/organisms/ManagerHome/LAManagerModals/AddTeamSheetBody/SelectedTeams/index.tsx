/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';
import {
    Chip,
    MultiSearchableDropdownListProps as List,
} from 'src/components/atoms';
import { SelectedTeam } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    teams: SelectedTeam[];
    onRemoveTeam: (team: SelectedTeam) => void;
}

const SelectedTeams = ({ teams, onRemoveTeam }: Props) => (
    <View style={styles.container}>
        {teams
            // .filter(item => item.isSelected)
            .map(team => (
                <Chip
                    key={team.teamId}
                    content={team.teamName}
                    containerStyle={{ marginRight: 5, marginTop: 5 }}
                    rightIconName='close'
                    outline
                    onPressRight={() => onRemoveTeam(team)}
                />
            ))}
    </View>
);

export default SelectedTeams;
