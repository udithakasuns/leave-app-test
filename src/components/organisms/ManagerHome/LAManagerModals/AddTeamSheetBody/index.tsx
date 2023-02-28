import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
    MultiSearchableDropdown,
    MultiSearchableDropdownListProps,
    Spacer,
    Text,
} from 'src/components/atoms';
import { ButtonDock } from 'src/components/molecules';
import { usePersistStore } from 'src/store';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { Team } from 'src/utils/types';
import SelecetedTeams from './SelectedTeams';
import { styles } from './styles';

const { scale, colors } = theme;

interface Props {
    allTeams: Team[];
    onClose: () => void;
}

const AddTeamSheetBody = ({ allTeams, onClose }: Props) => {
    const {
        manager: { filteredTeams },
        setManagerFilteredTeams,
    } = usePersistStore();

    const [teams, setTeams] = useState<Team[]>(filteredTeams);
    const [dropdownList, setDropdownList] = useState<
        MultiSearchableDropdownListProps[]
    >([]);

    const [text, setText] = useState<string>('');

    const onPressDropdownItem = (
        dropdownItem: MultiSearchableDropdownListProps,
    ) => {
        dropdownList.forEach((item, index) => {
            if (dropdownItem.id === item.id) {
                if (item.isSelected) {
                    dropdownList[index].isSelected = false;
                    setTeams([
                        ...teams.filter(
                            team => team.teamId.toString() !== item.id,
                        ),
                    ]);
                } else {
                    dropdownList[index].isSelected = true;
                    teams.unshift({
                        teamId: parseInt(item.id, 10),
                        teamName: item.value,
                    });
                    setTeams([...teams]);
                }
            }
        });

        setDropdownList([...dropdownList]);
    };

    const onRemoveTeam = (removeTeam: Team) => {
        setTeams([...teams.filter(team => team.teamId !== removeTeam.teamId)]);
        dropdownList.forEach((list, index) => {
            if (list.id === removeTeam.teamId.toString() && list.isSelected) {
                dropdownList[index].isSelected = false;
            }
        });
        setDropdownList([...dropdownList]);
    };

    const getNormalizeDropDownData = () => {
        if (allTeams.length > 0) {
            const dropDownList: MultiSearchableDropdownListProps[] =
                allTeams.map(team => ({
                    id: team.teamId.toString(),
                    label: team.teamName,
                    value: team.teamName,
                    isSelected: teams.some(
                        selectedTeam => selectedTeam.teamId === team.teamId,
                    ),
                }));
            setDropdownList([...dropDownList]);
        }
    };

    const onConfirm = () => {
        setManagerFilteredTeams([...teams]);
        onClose();
    };

    useEffect(() => {
        getNormalizeDropDownData();
    }, []);

    return (
        <View>
            <SelecetedTeams teams={teams} onRemoveTeam={onRemoveTeam} />
            <Spacer height={scale.vsc1} />
            <View style={styles.infoText}>
                <Text
                    testID={`${TID}TEXT_MAX_TEAMS_VALIDATION`}
                    type='ParaLG'
                    color={colors.gray600}>
                    You can add up to 3 teams
                </Text>
                <Text
                    testID={`${TID}TEXT_MAX_TEAMS_NUMBER`}
                    type='ParaLG'
                    color={colors.gray600}>
                    {teams.length}/3 teams
                </Text>
            </View>
            <Spacer height={scale.vsc10} />
            <MultiSearchableDropdown
                testIdInput={`${TID}DROPDOWN_TEAM_SEARCH`}
                disabled={teams.length === 3}
                value={text}
                onChangeText={val => setText(val)}
                label='Search Team'
                dropDownList={dropdownList}
                onDropdownItemPress={onPressDropdownItem}
            />
            <Spacer height={scale.sc8} />
            <ButtonDock
                iconPosition='left'
                primaryButton={{
                    testIdLabel: `${TID}BUTTON_CONFIRM`,
                    label: 'Confirm',
                    icon: 'arrow-forward',
                    onPress: onConfirm,
                    disabled: teams.length === 0,
                    mode:
                        teams.length === 0
                            ? 'outlined-light-error'
                            : 'contained',
                }}
                secondaryButton={{
                    testIdLabel: `${TID}BUTTON_CANCEL`,
                    label: 'Cancel',
                    onPress: onClose,
                }}
            />
            <Spacer height={scale.vsc2} />
        </View>
    );
};
export default AddTeamSheetBody;
