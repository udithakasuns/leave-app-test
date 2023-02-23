import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chipContainerStyle: {
        paddingVertical: scale.sc6,
        paddingHorizontal: scale.vsc6,
    },
});
