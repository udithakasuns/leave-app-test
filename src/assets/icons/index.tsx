/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgProps } from 'react-native-svg';
import Google from './Google';

export type IconName = 'google';

interface Props extends SvgProps {
    name: IconName;
}

export const SvgIcon = ({ name, ...props }: Props) => {
    switch (name) {
        case 'google':
            return <Google {...props} />;
        default:
            return null;
    }
};
