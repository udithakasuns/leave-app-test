import React from 'react';
import { FlatList } from 'react-native';
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
    <FlatList
        horizontal
        data={teams}
        keyExtractor={item => item.teamId.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <Chip
                testIdContent={`${TID}CHIP_${item.teamName}_${index}`}
                key={item.teamId}
                content={item.teamName}
                containerStyle={styles.chip}
                contentColor={colors.black}
                outline
                outlineColor={
                    item.recentlySelected
                        ? colors.secondaryOutline
                        : colors.secondaryGray
                }
                backgroundColor={
                    item.recentlySelected
                        ? colors.secondaryBackground
                        : colors.tertiaryColor
                }
                onPressChip={() => onSelectTeam(item)}
            />
        )}
    />
);

export default LATeamAvChipGroup;
