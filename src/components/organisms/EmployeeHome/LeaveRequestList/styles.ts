import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors, radius } = theme;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.tertiaryColor,
        marginTop: scale.sc10,
        borderRadius: radius.rd8,
        paddingHorizontal: scale.sc16,
    },
    scrollViewContainer: {
        width: '100%',
        height: '100%',
    },
    footerContainer: {
        justifyContent: 'flex-end',
        paddingBottom: scale.vsc20,
    },
    viewAllContent: {
        marginRight: scale.sc4,
    },
    viewAllPress: {
        alignSelf: 'flex-start',
    },
    viewAllContainer: {
        paddingVertical: scale.sc6,
    },
});
