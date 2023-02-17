/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, LegacyRef, createRef } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { Input, InputProps, Text } from 'components/atoms';
import { AtLeast } from 'src/utils/types';
import theme from 'src/utils/theme';
import { styles } from './style';
import ListItem from './ListItem';

const { scale } = theme;

export interface List {
    id: string;
    label: string;
    value: string;
    isSelected: boolean;
}

interface Props extends InputProps {
    onChangeText: (text: string) => void;
    list: List[];
    onListItemPress: (list: List) => void;
    listMaxHeight: number;
}

const LASearchableDropdown = ({
    label,
    onChangeText,
    value,
    list,
    onListItemPress,
    listMaxHeight = scale.sc220,
    ...rest
}: AtLeast<Props, 'onChangeText' | 'value' | 'onListItemPress'>) => {
    const inputRef: LegacyRef<TextInput> = createRef();

    const [open, setOpen] = useState<boolean>(false);

    // const onOpen = () => setOpen(true);

    const onClose = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.blur();
        }
        onChangeText('');
        setOpen(false);
    };

    const onUpdateText = (text: string) => {
        onChangeText(text);
        setOpen(true);
    };

    return (
        <View>
            <Input
                reference={inputRef}
                placeholder=''
                label={label || ''}
                onChangeText={(text: string) => onUpdateText(text)}
                value={value}
                rightIconName={open ? 'close' : 'search'}
                rightIconLibrary='material'
                rightIconSize={scale.sc24}
                onPressRightIcon={open ? onClose : undefined}
                autoCapitalize='none'
                {...rest}
            />
            {open && (
                <View style={[styles.list, { maxHeight: listMaxHeight }]}>
                    <ScrollView>
                        {list?.map((item, index) => {
                            if (
                                item.label
                                    .toLowerCase()
                                    .match(value?.toLowerCase() || '')
                            ) {
                                return (
                                    <ListItem
                                        key={item.id}
                                        label={item.label}
                                        isSelected={item.isSelected}
                                        index={index}
                                        onPress={() => onListItemPress(item)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

export default LASearchableDropdown;
