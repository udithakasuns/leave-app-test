import { StyleSheet, Platform } from 'react-native';
import theme from 'src/utils/theme';

const { pixel } = theme;

export const styles = StyleSheet.create({
    conentContainer: {
        minHeight: Platform.OS === 'ios' ? pixel(75) : pixel(85),
        justifyContent: 'flex-end',
    },
    headerRightContentBody: {
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.scale.sc46,
        width: theme.scale.sc46,
        borderRadius: theme.scale.sc46 / 2,
        backgroundColor: theme.colors.tertiaryColor,
    },
});
