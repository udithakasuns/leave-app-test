import React, { useState } from 'react';
import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    MultiSearchableDropdown,
    MultiSearchableDropdownListProps,
    Spacer,
} from 'src/components/atoms';
import { ButtonDock, MultiChipProps } from 'src/components/molecules';
import theme from 'src/utils/theme';
import SelecetedTeams from './SelectedTeams';

interface Props {
    teamChipsList: MultiChipProps[];
}
const { scale, colors } = theme;

const AddTeamSheetBody = ({ teamChipsList }: Props) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [list, setList] = useState<MultiSearchableDropdownListProps[]>([
        {
            id: '1',
            label: 'Design Team',
            isSelected: false,
            value: 'Design Team',
        },
        {
            id: '2',
            label: 'BA',
            isSelected: false,
            value: 'BA',
        },
        {
            id: '3',
            label: 'Product',
            isSelected: false,
            value: 'Product',
        },
        {
            id: '4',
            label: 'Swarmio',
            isSelected: false,
            value: 'Swarmio',
        },
        {
            id: '5',
            label: 'Agricam',
            isSelected: false,
            value: 'Agricam',
        },
    ]);

    const onPressListItem = (listItem: MultiSearchableDropdownListProps) => {
        list.forEach((item, index) => {
            if (listItem.id === item.id) {
                list[index].isSelected = !item.isSelected;
            }
        });
        setList([...list]);
    };

    return (
        <View style={{ flex: 1 }}>
            <SelecetedTeams list={list} onPressListItem={onPressListItem} />
            <Spacer height={scale.vsc6} />
            <MultiSearchableDropdown
                value={text}
                onChangeText={val => setText(val)}
                label='Search Team'
                dropDownList={list}
                onDropdownItemPress={onPressListItem}
            />
            <Spacer height={scale.sc8} />
            <ButtonDock
                iconPosition='left'
                primaryButton={{
                    label: 'Confirm',
                    icon: 'arrow-forward',
                    onPress: () => {},
                }}
                secondaryButton={{
                    label: 'Cancel',
                    onPress: () => {},
                }}
            />
            <Spacer height={scale.vsc2} />
        </View>
    );
};
export default AddTeamSheetBody;
