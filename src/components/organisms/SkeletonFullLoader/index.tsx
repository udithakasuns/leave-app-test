import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonFullLoader: React.FC = () => (
    <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item flexDirection='column' height='100%'>
            <SkeletonPlaceholder.Item flexDirection='row' alignItems='center'>
                <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={40}
                    marginRight={10}
                />

                <SkeletonPlaceholder.Item
                    width={140}
                    height={35}
                    borderRadius={20}
                />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
                width={160}
                height={30}
                borderRadius={10}
                marginTop={20}
            />
            <SkeletonPlaceholder.Item
                flexDirection='row'
                justifyContent='space-between'
                marginTop={20}>
                <SkeletonPlaceholder.Item
                    height={100}
                    borderRadius={10}
                    width='30%'
                />
                <SkeletonPlaceholder.Item
                    height={100}
                    borderRadius={10}
                    width='30%'
                />
                <SkeletonPlaceholder.Item
                    height={100}
                    borderRadius={10}
                    width='30%'
                />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
                width={160}
                height={30}
                borderRadius={10}
                marginTop={20}
            />
            <SkeletonPlaceholder.Item
                height='40%'
                borderRadius={10}
                width='100%'
                marginTop={20}
            />
        </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
);
export default SkeletonFullLoader;
