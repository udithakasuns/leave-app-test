import { ColorValue } from 'react-native';
import { TextTypeProps } from 'src/utils/types';
import { IconSize } from '../LAIcon';

export type ButtonMode =
    | 'outlined'
    | 'outlined-error'
    | 'contained'
    | 'contained-gray';

export type AlignType = 'flex-start' | 'center';

export type ButtonSize = 'small' | 'medium' | 'large';

export type PropertiesBySize = {
    containerPadding: number;
    iconSize: IconSize;
    labelType: TextTypeProps;
};

export type ColorProp = {
    background: ColorValue;
    textIcon: ColorValue;
    borderColor?: ColorValue;
};
