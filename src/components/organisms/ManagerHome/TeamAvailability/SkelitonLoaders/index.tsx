import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from 'src/utils/theme';

const { pixel, colors, scale } = theme;

export const SkelitonLoaderFull = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item height={pixel(200)} />
    </SkeletonPlaceholder>
);

export const SkelitonLoaderContent = () => (
    <SkeletonPlaceholder backgroundColor={colors.gray200} borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
            <SkeletonPlaceholder.Item
                width={pixel(80)}
                height={pixel(40)}
                marginRight={pixel(70)}
            />
            {[...Array(5)].map(item => (
                <SkeletonPlaceholder.Item
                    key={item + 1}
                    width={scale.sc36}
                    height={scale.sc36}
                    borderRadius={scale.sc36 / 2}
                    marginLeft={-pixel(10)}
                />
            ))}
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
);
