/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button } from 'components/atoms';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';
import { styles } from './styles';

const { scale } = theme;

interface Props {
    testIdLabel: string;
    label: string;
    isSelected: boolean;
    index: number;
    onPress: () => void;
}

const LASelectableButton = ({
    testIdLabel,
    label,
    isSelected,
    onPress,
    ...rest
}: PartialBy<Props, 'testIdLabel'>) => (
    <Button
        testIdLabel={testIdLabel}
        label={label}
        onPress={onPress}
        mode={isSelected ? 'outlined' : 'contained-gray'}
        icon={isSelected ? 'check-circle' : undefined}
        labelStyle={{
            paddingHorizontal: isSelected ? scale.sc16 : scale.sc10,
        }}
        alignContent='flex-start'
        buttonStyle={styles.container}
        {...rest}
    />
);

export default React.memo(LASelectableButton);
