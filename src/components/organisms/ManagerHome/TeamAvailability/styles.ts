import { StyleSheet, Platform } from 'react-native';
import theme from 'src/utils/theme';

const { pixel } = theme;

export const styles = StyleSheet.create({
    conentContainer: {
        minHeight: Platform.OS === 'ios' ? pixel(75) : pixel(85),
        justifyContent: 'flex-end',
    },
});
