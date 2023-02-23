import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import theme from 'src/utils/theme';

const { pixel } = theme;

export const SkelitonLoaderFull = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item height={pixel(200)} />
    </SkeletonPlaceholder>
);

export const SkelitonLoaderDetails = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
            flexDirection='row'
            alignItems='center'
            marginTop={pixel(10)}>
            <SkeletonPlaceholder.Item
                width={pixel(80)}
                height={pixel(40)}
                marginRight={pixel(70)}
            />
            {[...Array(5)].map(() => (
                <SkeletonPlaceholder.Item
                    width={pixel(50)}
                    height={pixel(50)}
                    borderRadius={pixel(50)}
                    marginLeft={-pixel(10)}
                />
            ))}
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
);
