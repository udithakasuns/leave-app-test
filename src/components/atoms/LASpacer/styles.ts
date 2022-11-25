import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { pixel } = theme;

export const styles = (height: number, width: number) =>
    StyleSheet.create({
        container: {
            marginHorizontal: pixel(width * 0.8),
            marginVertical: pixel(height * 0.8),
        },
    });
