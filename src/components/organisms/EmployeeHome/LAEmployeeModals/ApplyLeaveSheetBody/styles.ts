import { StyleSheet, Dimensions } from 'react-native';
import theme from 'src/utils/theme';

const { height } = Dimensions.get('window');

const { scale } = theme;

export const styles = StyleSheet.create({
    fullButtonStyle: {
        paddingVertical: scale.vsc6,
        width: '30%',
    },
    commentInputContainerStyle: {
        paddingVertical: 10,
    },
    commentContainerStyle: {
        margin: 0,
    },
    halfButtonsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: height * 0.08,
    },
});
