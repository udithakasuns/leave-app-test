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
            d='M15.191 9.817c.034-.267.059-.533.059-.817 0-.283-.025-.55-.059-.816l1.759-1.375a.42.42 0 0 0 .1-.534l-1.667-2.883a.416.416 0 0 0-.508-.183l-2.075.833a6.089 6.089 0 0 0-1.409-.817l-.316-2.208a.406.406 0 0 0-.409-.35H7.333a.406.406 0 0 0-.408.35l-.317 2.208a6.402 6.402 0 0 0-1.408.817l-2.075-.833a.472.472 0 0 0-.15-.025.413.413 0 0 0-.358.208L.95 6.275a.41.41 0 0 0 .1.534l1.758 1.375A6.61 6.61 0 0 0 2.75 9c0 .275.025.55.058.817L1.05 11.192a.42.42 0 0 0-.1.533l1.667 2.884a.416.416 0 0 0 .508.183l2.075-.833c.433.333.9.608 1.408.816l.317 2.209c.025.2.2.35.408.35h3.333c.209 0 .384-.15.409-.35l.317-2.209a6.401 6.401 0 0 0 1.408-.816l2.075.833c.05.017.1.025.15.025a.413.413 0 0 0 .358-.208l1.667-2.884a.42.42 0 0 0-.1-.533l-1.758-1.375Zm-1.65-1.425c.034.258.042.433.042.608s-.017.359-.042.609l-.116.941.741.584.9.7-.583 1.008-1.058-.425-.867-.35-.75.567c-.358.266-.7.466-1.041.608l-.884.358-.133.942-.167 1.125H8.417l-.159-1.125-.133-.942-.883-.358a4.729 4.729 0 0 1-1.025-.592l-.759-.583-.883.358-1.058.425-.584-1.008.9-.7.742-.583-.117-.942A6.704 6.704 0 0 1 4.417 9c0-.166.016-.358.041-.608l.117-.942-.742-.583-.9-.7.584-1.008 1.058.425.867.35.75-.567c.358-.267.7-.467 1.041-.608l.884-.359.133-.941.167-1.125h1.158l.158 1.125.134.941.883.359c.358.15.691.341 1.025.591l.758.584.883-.359 1.059-.425.583 1.009-.892.708-.741.583.116.942ZM9 5.667A3.332 3.332 0 1 0 12.333 9 3.332 3.332 0 0 0 9 5.667Zm0 5c-.917 0-1.667-.75-1.667-1.667 0-.916.75-1.666 1.667-1.666s1.666.75 1.666 1.666c0 .917-.75 1.667-1.666 1.667Z'
            fill={color}
        />
    </Svg>
);

export default AccountCircle;