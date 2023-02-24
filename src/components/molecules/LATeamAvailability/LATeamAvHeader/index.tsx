/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Chip, Icon, IconSize, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

interface NoneProps {
    headerType: 'none';
}

interface OptionProps {
    headerType: 'options';
    onPressOption: () => void;
}

interface DropdownProps {
    headerType: 'dropdown';
    dropDownList: string[];
    defaultItem: string;
    onSelect: (item: string) => void;
}

type Props = NoneProps | OptionProps | DropdownProps;

const LATeamAvHeader = (props: Props) => (
    <View style={styles.container}>
        <Text type='SubHBold'>Team availability</Text>
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
            props.headerType === 'dropdown' && (
                <Chip
                    content={props.defaultItem}
                    rightIconName='arrow-drop-down'
                    rightIconColor={colors.black}
                    contentColor={colors.black}
                    outline
                    outlineColor={colors.gray300}
                    contentTextType='ParaSM'
                    backgroundColor={colors.gray200}
                    containerStyle={styles.chipContainerStyle}
                />
            )
        )}
    </View>
);

export default LATeamAvHeader;
