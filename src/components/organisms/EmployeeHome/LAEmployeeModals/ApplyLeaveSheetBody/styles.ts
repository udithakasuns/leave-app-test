import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    fullButtonStyle: {
        paddingVertical: scale.vsc6,
        flex: 1,
        width: '30%',
    },
    commentInputContainerStyle: {
        paddingVertical: 10,
    },
    commentContainerStyle: {
        margin: 0,
    },
});
