import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    pressableContainerStyle: {
        paddingHorizontal: scale.sc2,
        paddingVertical: scale.sc4,
    },
});
