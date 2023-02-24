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
    <SkeletonPlaceholder backgroundColor={colors.gray300} borderRadius={4}>
        <SkeletonPlaceholder.Item marginTop={scale.vsc2}>
            <SkeletonPlaceholder.Item width={pixel(200)} height={pixel(20)} />
            <SkeletonPlaceholder.Item marginTop={pixel(10)} flexDirection='row'>
                {[...Array(5)].map((_, index) => (
                    <SkeletonPlaceholder.Item
                        width={scale.sc36}
                        height={scale.sc36}
                        borderRadius={scale.sc36 / 2}
                        marginLeft={index === 0 ? 0 : -pixel(10)}
                    />
                ))}
            </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
);
