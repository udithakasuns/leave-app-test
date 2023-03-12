import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        marginVertical: scale.vsc6,
    },
    subTitle: {
        textAlign: 'center',
        marginHorizontal: scale.sc40,
    },
});
