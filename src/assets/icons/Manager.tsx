/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const Manager = ({
    width = 17,
    height = 18,
    color = '#78350F',
    ...props
}: SvgProps) => (
    <Svg width={width} height={height} fill='none' {...props}>
        <Path
            d='M11.667 11.85a.933.933 0 1 0 0-1.867.933.933 0 0 0 0 1.867Z'
            fill={color}
        />
        <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M11.666 12.583c-.608 0-1.825.3-1.866.9.416.592 1.1.975 1.866.975.767 0 1.45-.383 1.867-.975-.041-.6-1.258-.9-1.867-.9Z'
            fill={color}
        />
        <Path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12.5 7.242V3.225L6.25.5 0 3.225v4.092C0 11.1 2.667 14.642 6.25 15.5a7.64 7.64 0 0 0 1.333-.458 4.977 4.977 0 0 0 4.084 2.125c2.758 0 5-2.242 5-5 0-2.475-1.8-4.525-4.167-4.925Zm-5.833 4.925c0 .466.066.925.191 1.35-.2.091-.4.183-.608.25-2.642-.834-4.583-3.534-4.583-6.45v-3l4.583-2 4.583 2v2.925a4.998 4.998 0 0 0-4.166 4.925Zm5 3.333a3.332 3.332 0 1 1 0-6.667 3.332 3.332 0 1 1 0 6.667Z'
            fill={color}
        />
    </Svg>
);

export default Manager;
