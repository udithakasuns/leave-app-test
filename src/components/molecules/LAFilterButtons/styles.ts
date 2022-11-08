import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: scale.vsc16,
        justifyContent: 'space-between',
    },
    contentStyle: {
        marginRight: scale.sc4,
    },
    pressableContainerStyle: {
        alignSelf: 'center',
    },
    containerStyle: {
        paddingVertical: scale.sc6,
    },
});
