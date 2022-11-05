import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale } = theme;

export const styles = StyleSheet.create({
    container: {
        paddingLeft: scale.sc20,
        paddingVertical: scale.sc8,
        backgroundColor: colors.white,
    },
    content: {
        marginHorizontal: scale.sc6,
        color: colors.gray600,
    },
    pressableContainer: {
        alignSelf: 'center',
    },
});
