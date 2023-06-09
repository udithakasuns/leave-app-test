/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';
import theme from 'src/utils/theme';

const { colors } = theme;

const LASwipeRefresh = (props: RefreshControlProps) => (
    <RefreshControl
        colors={[colors.primaryColor]}
        tintColor={colors.primaryColor}
        {...props}
    />
);

export default LASwipeRefresh;
