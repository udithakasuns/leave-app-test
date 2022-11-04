import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { ms, mvs } = theme;

export const styles = (height: number, width: number, factor: number) =>
    StyleSheet.create({
        container: {
            marginHorizontal: ms(width, factor),
            marginVertical: mvs(height, factor),
        },
    });
