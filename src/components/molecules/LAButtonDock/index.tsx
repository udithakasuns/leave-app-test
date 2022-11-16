/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Button, ButtonProps, Spacer } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, TestProps } from 'src/utils/types';
import { styles } from './styles';

export type MultiButtonProps = AtLeast<ButtonProps, 'label'> & {
    buttonId: number;
    selected?: boolean;
};

type ButtonDockProps = Partial<TestProps> & {
    primaryButton: AtLeast<ButtonProps, 'label' | 'onPress'>;
    secondaryButton: AtLeast<ButtonProps, 'label' | 'onPress'>;
    iconPosition: 'right' | 'left';
};

const LAButtonDock = ({
    primaryButton,
    secondaryButton,
    iconPosition = 'right',
}: AtLeast<ButtonDockProps, 'primaryButton' | 'secondaryButton'>) => (
    <>
        <Button
            label={primaryButton.label}
            icon={primaryButton.icon ?? 'check'}
            mode={primaryButton.mode ?? 'contained'}
            iconPosition={iconPosition}
            onPress={primaryButton.onPress}
            labelStyle={styles.labelStyle}
        />
        <Spacer height={theme.scale.vsc6} />
        <Button
            label={secondaryButton.label}
            icon={secondaryButton.icon ?? 'close'}
            mode={secondaryButton.mode ?? 'contained-gray'}
            iconPosition={iconPosition}
            onPress={secondaryButton.onPress}
            labelStyle={styles.labelStyle}
        />
    </>
);

export default LAButtonDock;
