import { Platform, StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

const paddingTop = Platform.OS === 'ios' ? 0 : theme.scale.sc16;

export const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: scale.sc20,
        paddingTop,
    },
    containerScollable: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: scale.sc20,
    },
    scrollViewContainer: {
        flexGrow: 1,
        paddingTop,
    },
});
