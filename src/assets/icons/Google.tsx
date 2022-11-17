/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
import theme from 'utils/theme';

const { scale } = theme;

const Google = ({ width = 20, height = 20, ...props }: SvgProps) => (
    <Svg
        width={width}
        height={height}
        fill='none'
        // xmlns='http://www.w3.org/2000/svg'
        {...props}>
        <G clipPath='url(#a)'>
            <Path
                d='M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.92-.725 2.303-2.084 3.233l-.02.124 3.028 2.292.21.02c1.926-1.738 3.037-4.296 3.037-7.33Z'
                fill='#4285F4'
            />
            <Path
                d='M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.218-2.436c-.862.587-2.017.997-3.536.997a6.126 6.126 0 0 1-5.801-4.141l-.12.01-3.148 2.38-.041.112c1.677 3.255 5.122 5.492 9.11 5.492Z'
                fill='#000'
            />
            <Path
                d='M4.397 11.937a6.009 6.009 0 0 1-.34-1.971c0-.687.125-1.351.33-1.971l-.007-.132-3.187-2.42-.104.05A9.79 9.79 0 0 0 0 9.965a9.79 9.79 0 0 0 1.088 4.473l3.308-2.502Z'
                fill='#FBBC05'
            />
            <Path
                d='M10.2 3.853c1.914 0 3.206.809 3.943 1.484l2.878-2.746C15.253.985 12.953 0 10.199 0 6.211 0 2.766 2.237 1.09 5.492l3.297 2.503A6.152 6.152 0 0 1 10.2 3.853'
                fill='#EB4335'
            />
        </G>
        <Defs>
            <ClipPath id='a'>
                <Path fill='#fff' d='M0 0h20v20H0z' />
            </ClipPath>
        </Defs>
    </Svg>
);

export default Google;
