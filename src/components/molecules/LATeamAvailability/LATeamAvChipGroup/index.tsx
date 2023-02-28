import React from 'react';
import { View } from 'react-native';
import { Chip } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { SelectedTeam } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    teams: SelectedTeam[];
    onSelectTeam: (team: SelectedTeam) => void;
}

const LATeamAvChipGroup = ({ teams, onSelectTeam }: Props) => (
    <View style={styles.container}>
        {teams.map((team, index) => (
            <Chip
                testIdContent={`${TID}CHIP_${team.teamName}_${index}`}
                key={team.teamId}
                content={team.teamName}
                containerStyle={styles.chip}
                contentColor={colors.black}
                outline
                outlineColor={
                    team.recentlySelected
                        ? colors.secondaryOutline
                        : colors.secondaryGray
                }
                backgroundColor={
                    team.recentlySelected
                        ? colors.secondaryBackground
                        : colors.tertiaryColor
                }
                onPressChip={() => onSelectTeam(team)}
            />
        ))}
    </View>
);

export default LATeamAvChipGroup;
