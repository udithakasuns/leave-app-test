import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

interface Props {
    bottomLayoutHeigt: number;
}

const BUTTON_LAYER_BOTTOM = scale.sc20;

export const useStyles = ({ bottomLayoutHeigt }: Props) =>
    StyleSheet.create({
        innerContainer: {
            paddingHorizontal: scale.sc20,
            backgroundColor: 'white',
        },
        buttonContainer: {
            position: 'absolute',
            alignSelf: 'center',
            width: '100%',
            bottom: BUTTON_LAYER_BOTTOM,
        },
        scrollView: {
            flexGrow: 1,
            paddingBottom: bottomLayoutHeigt + BUTTON_LAYER_BOTTOM * 2,
        },
    });
