import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

export const styles = StyleSheet.create({
    containerStyle: {
        paddingVertical: scale.sc1,
        backgroundColor: colors.white,
    },
    inputTextStyle: {
        paddingVertical: scale.vsc8,
    },
    inputContainerStyle: { margin: 0 },
    itemRow: {
        flexDirection: 'row',
    },
});
