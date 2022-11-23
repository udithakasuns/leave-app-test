/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Filter = ({
    width = 14,
    height = 17,
    color = '#000000',
    ...props
}: SvgProps) => (
    <Svg width={width} height={height} fill='none' {...props}>
        <Path
            d='M4.5 2.667a.833.833 0 1 0 0 1.666.833.833 0 0 0 0-1.666Zm-2.358 0a2.5 2.5 0 0 1 4.716 0h5.975a.833.833 0 0 1 0 1.666H6.858a2.5 2.5 0 0 1-4.716 0h-.975a.833.833 0 0 1 0-1.666h.975Zm7.358 5a.833.833 0 1 0 0 1.666.833.833 0 0 0 0-1.666Zm-2.358 0a2.5 2.5 0 0 1 4.716 0h.975a.833.833 0 0 1 0 1.666h-.975a2.501 2.501 0 0 1-4.716 0H1.167a.833.833 0 0 1 0-1.666h5.975Zm-2.642 5a.834.834 0 1 0 0 1.667.834.834 0 0 0 0-1.667Zm-2.358 0a2.5 2.5 0 0 1 4.716 0h5.975a.834.834 0 0 1 0 1.666H6.858a2.5 2.5 0 0 1-4.716 0h-.975a.833.833 0 1 1 0-1.666h.975Z'
            fill={color}
        />
    </Svg>
);

export default Filter;
