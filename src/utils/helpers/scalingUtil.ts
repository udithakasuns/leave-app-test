// import { Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// // Guideline sizes are based on mobile prototype
// const guidelineBaseWidth = 428;
// const guidelineBaseHeight = 926;

// // const guidelineBaseWidth = 414;
// // const guidelineBaseHeight = 896;

// const scale = (size: number) => (width / guidelineBaseWidth) * size;
// const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
// const moderateScale = (size: number, factor = 0.5) =>
//     size + (scale(size) - size) * factor;
// /* istanbul ignore next */
// const moderateVerticalScale = (size: number, factor = 0.5) =>
//     size + (verticalScale(size) - size) * factor;

// export { scale, verticalScale, moderateScale, moderateVerticalScale };

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
    const newValue = value * 0.2 + 0.6;
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

export const FONT = (value: number) => {
    const newValue = value * 0.2 + 0.6;
    return WIDTH(newValue);
};

const scale = PIXEL;
const verticalScale = PIXEL;
const moderateScale = PIXEL;
const moderateVerticalScale = PIXEL;
const font = FONT;

export { scale, verticalScale, moderateScale, moderateVerticalScale, font };
