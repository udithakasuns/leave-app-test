import { Platform, StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingTop: Platform.OS === 'ios' ? theme.scale.sc10 : theme.scale.sc16,
    },
});
