/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Chip, ChipProps } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

export type MultiChipProps = AtLeast<ChipProps, 'content'> & {
    chipId: number;
    selected?: boolean;
    chipInfo?: string;
};

export type ChipsGroupProps = {
    onPress: (id: number) => void;
    chips: MultiChipProps[];
    singleSelection: boolean;
    rightIconName: string;
};

const LATeamChipGroup = ({
    onPress,
    chips,
    singleSelection = false,
    rightIconName,
    ...rest
}: AtLeast<ChipsGroupProps, 'chips'>) => {
    const [chipsLocal, setChipsLocal] = useState<MultiChipProps[]>([]);

    const handleOnPress = useCallback(
        (id: number) => {
            chipsLocal.forEach(chipItem => {
                if (chipItem.selected && chipItem.chipId === id) {
                    chipItem.selected = false;
                } else if (singleSelection) {
                    chipItem.selected = chipItem.chipId === id;
                } else {
                    chipItem.selected =
                        chipItem.selected || chipItem.chipId === id;
                }
            });
            setChipsLocal([...chipsLocal]);
            if (onPress) onPress(id);
        },
        [chipsLocal],
    );

    useEffect(() => {
        const chipsDeepClone = JSON.parse(JSON.stringify(chips));
        setChipsLocal([...chipsDeepClone]);
    }, []);

    return (
        <View style={styles.container}>
            {chipsLocal.map(item => (
                <Chip
                    key={item.chipId}
                    content={item.content}
                    outline
                    rightIconName={rightIconName}
                    onPressChip={() => {
                        onPress(item.chipId);
                        handleOnPress(item.chipId);
                    }}
                    pressableContainerStyle={styles.pressableContainerStyle}
                    contentColor={colors.black}
                    backgroundColor={
                        item.selected
                            ? colors.secondaryBackground
                            : colors.tertiaryColor
                    }
                    containerStyle={styles.chipContainer}
                    outlineColor={
                        item.selected
                            ? colors.secondaryOutline
                            : colors.secondaryGray
                    }
                    {...rest}
                />
            ))}
        </View>
    );
};

export default LATeamChipGroup;
