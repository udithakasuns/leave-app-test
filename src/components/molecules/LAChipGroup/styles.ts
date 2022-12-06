import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, pixel } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
    },
    chipContainer: {
        paddingHorizontal: pixel(8.2),
    },
    pressableContainerStyle: {
        paddingHorizontal: pixel(1),
        paddingVertical: scale.sc4,
    },
});
