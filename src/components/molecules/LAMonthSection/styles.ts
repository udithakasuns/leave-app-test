import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: scale.sc2,
        paddingBottom: scale.sc10,
    },
    contentContainer: {
        marginRight: scale.sc10,
    },
});
