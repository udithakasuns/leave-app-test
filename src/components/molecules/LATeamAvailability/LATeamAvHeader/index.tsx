/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Chip, Icon, IconSize, Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { Team } from 'src/utils/types';
import { Modal, SelectableButton } from '../..';
import { styles } from './styles';

const { colors } = theme;

interface NoneProps {
    headerType: 'none';
}

interface OptionProps {
    headerType: 'options';
    onPressOption: () => void;
}

interface TeamSelector {
    headerType: 'teamSelector';
    teams: Team[];
    selectedTeam: Team;
    onSelectTeam: (team: Team) => void;
}

type Props = NoneProps | OptionProps | TeamSelector;

const LATeamAvHeader = (props: Props) => {
    const [openTeamSelector, setOpenTeamSelector] = useState<boolean>(false);

    const onOpenTeamSelector = () => setOpenTeamSelector(true);
    const onCloseTeamSelector = () => setOpenTeamSelector(false);

    return (
        <View style={styles.container}>
            <Text testID={`${TID}TEXT_TEAM_AVAILABILITY_TITLE`} type='SubHBold'>
                Team availability
            </Text>
            {props.headerType === 'options' ? (
                <TouchableOpacity onPress={props.onPressOption}>
                    <Icon
                        name='dots-horizontal'
                        library='community'
                        color={colors.gray600}
                        enableBackground={false}
                        size={IconSize.medium}
                    />
                </TouchableOpacity>
            ) : (
                props.headerType === 'teamSelector' && (
                    <>
                        <Chip
                            testIdContent={`${TID}SELECTED_TEAM`}
                            onPressChip={onOpenTeamSelector}
                            content={props.selectedTeam.teamName}
                            rightIconName='arrow-drop-down'
                            rightIconColor={colors.black}
                            contentColor={colors.black}
                            outline
                            outlineColor={colors.gray300}
                            contentTextType='ParaSM'
                            backgroundColor={colors.gray200}
                            containerStyle={styles.chipContainerStyle}
                        />
                        <Modal
                            header='Select Team'
                            isVisible={openTeamSelector}
                            onClose={onCloseTeamSelector}
                            sheetBody={
                                <View>
                                    {props.teams.map((team, index) => (
                                        <SelectableButton
                                            testIdLabel={`${TID}SELECTABLE_ITEM_${team.teamName}_${index}`}
                                            key={team.teamId}
                                            label={team.teamName}
                                            index={index}
                                            isSelected={
                                                team.teamId ===
                                                props.selectedTeam.teamId
                                            }
                                            onPress={() => {
                                                props.onSelectTeam(team);
                                                onCloseTeamSelector();
                                            }}
                                        />
                                    ))}
                                </View>
                            }
                        />
                    </>
                )
            )}
        </View>
    );
};

export default LATeamAvHeader;
