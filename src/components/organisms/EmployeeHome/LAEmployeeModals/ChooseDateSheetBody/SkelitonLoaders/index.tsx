import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from 'src/utils/theme';

const { pixel, scale } = theme;

export const SkelitonLoaderFull = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
            height={pixel(700)}
            marginTop={scale.sc12}
            marginBottom={scale.sc40}
        />
    </SkeletonPlaceholder>
);
