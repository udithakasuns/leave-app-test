/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Notification = ({
    width = 18,
    height = 17,
    color = '#78350F',
    ...props
}: SvgProps) => (
    <Svg width={width} height={height} fill='none' {...props}>
        <Path
            d='M9 16.333c.917 0 1.667-.75 1.667-1.666H7.333c0 .916.75 1.666 1.667 1.666Zm5-5V7.167c0-2.559-1.358-4.7-3.75-5.267v-.567c0-.691-.558-1.25-1.25-1.25s-1.25.559-1.25 1.25V1.9C5.367 2.467 4 4.6 4 7.167v4.166L2.333 13v.833h13.334V13L14 11.333Zm-1.667.834H5.667v-5c0-2.067 1.258-3.75 3.333-3.75s3.333 1.683 3.333 3.75v5ZM5.317 1.4 4.125.208A8.687 8.687 0 0 0 .692 6.75h1.666A7.038 7.038 0 0 1 5.317 1.4Zm10.325 5.35h1.666A8.74 8.74 0 0 0 13.875.208L12.692 1.4a7.08 7.08 0 0 1 2.95 5.35Z'
            fill={color}
        />
    </Svg>
);

export default Notification;
