import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    MultiSearchableDropdown,
    MultiSearchableDropdownListProps,
    Spacer,
} from 'src/components/atoms';
import { ButtonDock, MultiChipProps } from 'src/components/molecules';
import { usePersistStore } from 'src/store';
import theme from 'src/utils/theme';
import { SelectedTeam, Team } from 'src/utils/types';
import SelecetedTeams from './SelectedTeams';

interface Props {
    allTeams: Team[];
    onClose: () => void;
}
const { scale, colors } = theme;

const AddTeamSheetBody = ({ allTeams, onClose }: Props) => {
    const {
        manager: { selectedTeams },
        setManagerTeams,
    } = usePersistStore();

    const [teams, setTeams] = useState<SelectedTeam[]>(selectedTeams);
    const [dropdownList, setDropdownList] = useState<
        MultiSearchableDropdownListProps[]
    >([]);

    const [showError, setShowError] = useState<boolean>(false);
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
                        recentlySelected: false,
                    });
                    setTeams([...teams]);
                }
            }
        });

        setDropdownList([...dropdownList]);
    };

    const onRemoveTeam = (removeTeam: SelectedTeam) => {
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
        teams.forEach((_, index) => {
            if (index === 0) {
                teams[index].recentlySelected = true;
            } else {
                teams[index].recentlySelected = false;
            }
        });
        setManagerTeams([...teams]);
        onClose();
    };

    useEffect(() => {
        getNormalizeDropDownData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <SelecetedTeams teams={teams} onRemoveTeam={onRemoveTeam} />
            <Spacer height={scale.vsc6} />
            <MultiSearchableDropdown
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
                    label: 'Confirm',
                    icon: 'arrow-forward',
                    onPress: onConfirm,
                }}
                secondaryButton={{
                    label: 'Cancel',
                    onPress: onClose,
                }}
            />
            <Spacer height={scale.vsc2} />
        </View>
    );
};
export default AddTeamSheetBody;
