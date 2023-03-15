import { StyleSheet } from 'react-native';
import theme from '../theme';

const { scale, colors, radius, pixel } = theme;

export const styles = StyleSheet.create({
    successToastContainer: {
        width: '90%',
        borderRadius: radius.rd4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lime50,
        padding: scale.sc16,
        paddingHorizontal: scale.vsc20,
        maxHeight: scale.vsc64,
    },
    errorToastContainer: {
        width: '90%',
        borderRadius: radius.rd4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.red50,
        padding: scale.sc16,
        minHeight: scale.vsc64,
    },
    warningToastContainer: {
        width: '90%',
        borderRadius: radius.rd4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.amber50,
        paddingVertical: scale.vsc50,
        paddingHorizontal: scale.vsc20,
        minHeight: scale.vsc64,
        maxHeight: pixel(78),
    },
    textContainer: {
        width: '85%',
        height: theme.scale.sc16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    leftInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    leftSuccessContainer: {
        height: scale.vsc32,
        borderWidth: 1,
        borderColor: colors.green200,
        borderRadius: radius.rd4,
    },
    leftErrorContainer: {
        height: scale.vsc32,
        borderWidth: 1,
        borderColor: colors.red500,
        borderRadius: radius.rd4,
    },
    leftwarningContainer: {
        height: scale.vsc32,
        borderWidth: 1,
        borderColor: colors.yellow300,
        borderRadius: radius.rd4,
    },
    rightwarningContainer: {
        flex: 5,
    },
});
