import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

export const styles = StyleSheet.create({
    modalheaderRightContentBody: {
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.scale.sc46,
        width: theme.scale.sc46,
        borderRadius: theme.scale.sc46 / 2,
        backgroundColor: theme.colors.tertiaryColor,
    },
});
