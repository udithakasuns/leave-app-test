import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors } = theme;

const styles = (borderWidth: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            borderWidth,
            borderColor: colors.dividerColor,
        },
    });

export default styles;
