/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const File = ({
    width = 19,
    height = 22,
    color = '#52525B',
    ...props
}: SvgProps) => (
    <Svg width={width} height={height} fill='none' {...props}>
        <Path
            d='M14 0H2C.9 0 0 .9 0 2v14h2V2h12V0Zm-1 4H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H17c1.1 0 2-.9 2-2V10l-6-6ZM6 20V6h6v5h5v9H6Z'
            fill={color}
        />
    </Svg>
);

export default File;
