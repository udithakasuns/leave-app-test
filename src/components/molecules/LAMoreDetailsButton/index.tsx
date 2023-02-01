/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { SelectionButton } from 'components/molecules';

export type Props = {
    onPress: () => void;
};

const LAMoreDetailsButton = ({ onPress }: Props) => (
    <View>
        <Divider />
        <SelectionButton
            buttonStyle={{ backgroundColor: theme.colors.white }}
            label='View More Details'
            onPress={onPress}
        />
        <Divider />
    </View>
);

export default LAMoreDetailsButton;
