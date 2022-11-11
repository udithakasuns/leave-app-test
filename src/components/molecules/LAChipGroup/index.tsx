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
    onPress: (chipProps: MultiChipProps[]) => void;
    chips: MultiChipProps[];
};

const LAChipGroup = ({
    onPress,
    chips,
    ...rest
}: AtLeast<ChipsGroupProps, 'chips'>) => {
    const [chipsLocal, setChipsLocal] = useState<MultiChipProps[]>([]);

    const handleOnPress = useCallback(
        (id: number) => {
            chipsLocal.forEach(chipItem => {
                if (chipItem.selected && chipItem.chipId === id) {
                    chipItem.selected = false;
                } else {
                    chipItem.selected =
                        chipItem.selected || chipItem.chipId === id;
                }
            });
            setChipsLocal([...chipsLocal]);
            if (onPress) onPress(chipsLocal);
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
                    leftIconName={item.selected ? 'check-circle' : undefined}
                    outline={item.selected}
                    onPressChip={() => onPress && handleOnPress(item.chipId)}
                    leftIconColor={colors.secondaryLabel}
                    pressableContainerStyle={styles.pressableContainerStyle}
                    contentColor={
                        item.selected ? colors.secondaryLabel : colors.gray600
                    }
                    backgroundColor={
                        item.selected
                            ? colors.secondaryBackground
                            : colors.tertiaryColor
                    }
                    outlineColor={colors.secondaryOutline}
                    {...rest}
                />
            ))}
        </View>
    );
};

export default LAChipGroup;
