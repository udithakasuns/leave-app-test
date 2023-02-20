import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

export const styles = StyleSheet.create({
    searchContainer: {
        paddingVertical: scale.sc1,
    },
    itemStyle: {
        padding: 10,
        marginTop: 2,
        backgroundColor: colors.white,
        borderRadius: 5,
    },
    inputContainerStyle: { margin: 0 },
});
