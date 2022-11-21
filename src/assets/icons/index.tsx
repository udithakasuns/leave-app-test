/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SvgProps } from 'react-native-svg';
import Filter from './Filter';
import Google from './Google';
import Manager from './Manager';
import Notification from './Notification';

export type IconName = 'google' | 'filter' | 'notification';

interface Props extends SvgProps {
    name: IconName | string;
}

export const SvgIcon = ({ name, ...props }: Props) => {
    switch (name) {
        case 'google':
            return <Google {...props} />;
        case 'filter':
            return <Filter {...props} />;
        case 'notification':
            return <Notification {...props} />;
        case 'manager':
            return <Manager {...props} />;
        default:
            return null;
    }
};
