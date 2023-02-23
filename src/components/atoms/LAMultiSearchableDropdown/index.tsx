/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, LegacyRef, createRef, useEffect } from 'react';
import { View, TextInput, ScrollView } from 'react-native';
import { Input, InputProps } from 'components/atoms';
import { AtLeast } from 'src/utils/types';
import theme from 'src/utils/theme';
import { styles } from './style';
import DropdownItem from './DropdownItem';

const { scale } = theme;

export interface DropDownList {
    id: string;
    label: string;
    value: string;
    isSelected: boolean;
}

interface Props extends InputProps {
    testIdDropDownList: string;
    testIdDropDownItem: string;
    testIdDropdownContent: string;
    dropDownList: DropDownList[];
    dropdownMaxHeight: number;
    onChangeText: (text: string) => void;
    onDropdownItemPress: (list: DropDownList) => void;
}

const LAMultiSearchableDropdown = ({
    testIdDropDownList,
    testIdDropDownItem,
    testIdDropdownContent,
    label,
    dropDownList,
    value,
    dropdownMaxHeight = scale.sc220,
    onChangeText,
    onDropdownItemPress,
    disabled,
    ...rest
}: AtLeast<
    Props,
    'onChangeText' | 'value' | 'onDropdownItemPress' | 'dropDownList'
>) => {
    const inputRef: LegacyRef<TextInput> = createRef();
    const [openDropDown, setOpenDropDown] = useState<boolean>(false);

    const onCloseDropDown = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.blur();
        }
        onChangeText('');
        setOpenDropDown(false);
    };

    const onUpdateText = (text: string) => {
        onChangeText(text);
    };

    useEffect(() => {
        if (disabled) {
            onCloseDropDown();
        }
    }, [disabled]);

    return (
        <View style={styles.container}>
            <Input
                reference={inputRef}
                placeholder=''
                label={label || ''}
                onChangeText={(text: string) => onUpdateText(text)}
                value={value}
                rightIconName={openDropDown ? 'close' : 'search'}
                rightIconLibrary='material'
                rightIconSize={scale.sc24}
                onPressRightIcon={openDropDown ? onCloseDropDown : undefined}
                autoCapitalize='none'
                onPressIn={() => !disabled && setOpenDropDown(true)}
                disabled={disabled}
                {...rest}
            />
            {openDropDown && (
                <View style={[styles.list, { maxHeight: dropdownMaxHeight }]}>
                    <ScrollView testID={testIdDropDownList}>
                        {dropDownList.map((item, index) => {
                            if (
                                item.label
                                    .toLowerCase()
                                    .match(value?.toLowerCase() || '')
                            ) {
                                return (
                                    <DropdownItem
                                        testIdItem={testIdDropDownItem}
                                        testIdContent={testIdDropdownContent}
                                        key={item.id}
                                        label={item.label}
                                        isSelected={item.isSelected}
                                        index={index}
                                        onPress={() =>
                                            onDropdownItemPress(item)
                                        }
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

export default LAMultiSearchableDropdown;
