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
        paddingHorizontal: scale.vsc4,
        paddingVertical: scale.vsc8,
    },
    pressableContainerStyle: {
        paddingHorizontal: pixel(1),
        paddingVertical: scale.sc4,
    },
});
