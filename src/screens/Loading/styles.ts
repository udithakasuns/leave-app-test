import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors } = theme;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
});
