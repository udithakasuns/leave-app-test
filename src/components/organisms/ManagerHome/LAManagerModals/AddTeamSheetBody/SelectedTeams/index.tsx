import React from 'react';
import { FlatList } from 'react-native';
import { Chip } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import { Team } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    teams: Team[];
    onRemoveTeam: (team: Team) => void;
}

const SelectedTeams = ({ teams, onRemoveTeam }: Props) => (
    <FlatList
        data={teams}
        keyExtractor={team => team.teamId.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <Chip
                testId={`${TID}CHIP_SELECTED_TEAM_${item}_${index}`}
                key={item.teamId}
                content={item.teamName}
                containerStyle={styles.chipContainer}
                rightIconName='close'
                outline
                onPressRight={() => onRemoveTeam(item)}
            />
        )}
    />
);

export default SelectedTeams;
