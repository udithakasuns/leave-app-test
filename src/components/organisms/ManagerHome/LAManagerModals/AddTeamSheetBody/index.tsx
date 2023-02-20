import React, { useState } from 'react';
import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    SearchableDropdown,
    SearchableDropdownListProps,
    Spacer,
} from 'src/components/atoms';
import {
    ButtonDock,
    MultiChipProps,
    TeamChipGroup,
} from 'src/components/molecules';
import theme from 'src/utils/theme';

interface Props {
    teamChipsList: MultiChipProps[];
}
const { scale } = theme;

const AddTeamSheetBody = ({ teamChipsList }: Props) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [list, setList] = useState<SearchableDropdownListProps[]>([
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

    const onPressListItem = (listItem: SearchableDropdownListProps) => {
        list.forEach(item => {
            if (listItem.id === item.id) {
                // item.isSelected = !item.isSelected;
            }
        });
        setList([...list]);
    };

    return (
        <View style={{ flex: 1 }}>
            <TeamChipGroup
                chips={teamChipsList}
                singleSelection
                onPress={() => {}}
                rightIconName='close'
            />
            <Spacer height={scale.vsc6} />
            <SearchableDropdown
                value={text}
                onChangeText={val => setText(val)}
                label='Search Team'
                list={list}
                onListItemPress={onPressListItem}
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
