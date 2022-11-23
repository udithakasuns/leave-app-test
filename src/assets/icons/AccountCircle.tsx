/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const AccountCircle = ({
    width = 18,
    height = 18,
    color = '#000000',
    ...props
}: SvgProps) => (
    <Svg width={width} height={height} fill='none' {...props}>
        <Path
            d='M9 .667A8.336 8.336 0 0 0 .667 9c0 4.6 3.733 8.334 8.333 8.334S17.333 13.6 17.333 9 13.6.667 9 .667ZM4.89 14.234C5.25 13.484 7.433 12.75 9 12.75c1.566 0 3.758.734 4.108 1.484A6.578 6.578 0 0 1 9 15.667a6.577 6.577 0 0 1-4.109-1.433Zm9.409-1.209c-1.192-1.45-4.084-1.941-5.3-1.941-1.217 0-4.109.491-5.3 1.941A6.625 6.625 0 0 1 2.333 9 6.676 6.676 0 0 1 9 2.334 6.676 6.676 0 0 1 15.666 9a6.625 6.625 0 0 1-1.366 4.025ZM9 4a2.91 2.91 0 0 0-2.917 2.917A2.91 2.91 0 0 0 9 9.834a2.91 2.91 0 0 0 2.916-2.917A2.91 2.91 0 0 0 9 4Zm0 4.167c-.692 0-1.25-.558-1.25-1.25s.558-1.25 1.25-1.25c.691 0 1.25.558 1.25 1.25S9.69 8.167 9 8.167Z'
            fill={color}
        />
    </Svg>
);

export default AccountCircle;
