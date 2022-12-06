import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { radius } = theme;

export const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: radius.rd8,
        justifyContent: 'center',
        flex: 1,
    },
    iconLabelContainer: {
        width: '100%',
        justifyContent: 'space-between',
    },
});
