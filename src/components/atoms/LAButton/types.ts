import { ColorValue } from 'react-native';
import { IconSize } from '../LAIcon';
import { TextType } from '../LAText';

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
    labelType: TextType;
};

export type ColorProp = {
    background: ColorValue;
    textIcon: ColorValue;
    borderColor?: ColorValue;
};
