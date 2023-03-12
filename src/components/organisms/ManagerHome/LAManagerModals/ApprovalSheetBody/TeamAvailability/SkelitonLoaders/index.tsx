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
        <SkeletonPlaceholder.Item key={1} marginTop={scale.vsc2}>
            <SkeletonPlaceholder.Item
                key={2}
                width={pixel(200)}
                height={pixel(20)}
            />
            <SkeletonPlaceholder.Item
                key={3}
                marginTop={pixel(5)}
                flexDirection='row'>
                {[...Array(5)].map((item, index) => (
                    <SkeletonPlaceholder.Item
                        key={item + 4}
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
