import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on mobile prototype
const guidelineBaseWidth = 428;
const guidelineBaseHeight = 926;
const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;
/* istanbul ignore next */
const moderateVerticalScale = (size: number, factor = 0.5) =>
    size + (verticalScale(size) - size) * factor;

export { scale, verticalScale, moderateScale, moderateVerticalScale };
