/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonProps } from 'src/components/atoms';
import { AtLeast } from 'src/utils/types';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale } = theme;

export type MultiButtonProps = AtLeast<ButtonProps, 'label'> & {
    buttonId: number;
    selected?: boolean;
};

type ButtonsGroupProps = {
    onPress: (chipProps: MultiButtonProps[]) => void;
    buttons: MultiButtonProps[];
};

const LAButtonGroup = ({ onPress, buttons, ...rest }: ButtonsGroupProps) => {
    const [buttonsLocal, setButtonsLocal] =
        useState<MultiButtonProps[]>(buttons);

    const handleOnPress = useCallback((id: number) => {
        buttonsLocal.forEach(buttonItem => {
            if (buttonItem.selected && buttonItem.buttonId === id) {
                return;
            }
            buttonItem.selected = buttonItem.buttonId === id;
        });
        setButtonsLocal([...buttonsLocal]);
        if (onPress) onPress(buttonsLocal);
    }, []);

    useEffect(() => {
        setButtonsLocal(buttons);
    }, [buttons]);

    return (
        <>
            {buttonsLocal.map(item => (
                <Button
                    key={item.buttonId}
                    label={item.label}
                    onPress={() => handleOnPress(item.buttonId)}
                    mode={item.selected ? 'outlined' : 'contained-gray'}
                    icon={item.selected ? 'check-circle' : undefined}
                    labelStyle={{
                        paddingHorizontal: item.selected
                            ? scale.sc16
                            : scale.sc10,
                    }}
                    alignContent='flex-start'
                    buttonStyle={styles.container}
                    {...rest}
                />
            ))}
        </>
    );
};

export default LAButtonGroup;
