import { Dimensions, StatusBar } from 'react-native';

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;

export const HEIGHT = (value: number) => DEVICE_HEIGHT * (value / 100);

export const WIDTH = (value: number) => {
    // value = (value * 0.2) + 0.6;
    if (DEVICE_WIDTH >= 1000) {
        return DEVICE_WIDTH * (value / 175);
    }
    if (DEVICE_WIDTH >= 800) {
        return DEVICE_WIDTH * (value / 150);
    }
    if (DEVICE_WIDTH >= 600) {
        return DEVICE_WIDTH * (value / 125);
    }
    return DEVICE_WIDTH * (value / 100);
};

export const PIXEL = (value: number) => {
    // const newValue = value * 0.2 + 0.6;

    const newValue = value * 0.2 + DEVICE_WIDTH * 0.001;
    if (DEVICE_WIDTH >= 1000) {
        return DEVICE_WIDTH * (newValue / 175);
    }
    if (DEVICE_WIDTH >= 800) {
        return DEVICE_WIDTH * (newValue / 150);
    }
    if (DEVICE_WIDTH >= 600) {
        return DEVICE_WIDTH * (newValue / 125);
    }
    return DEVICE_WIDTH * (newValue / 100);
};

export const FONT = (value: number) => PIXEL(value);

const pixel = PIXEL;
const height = HEIGHT;
const font = FONT;

export { pixel, height, font };
