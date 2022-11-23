import { StyleSheet } from 'react-native';
import theme from '../theme';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.white },
    successToastContainer: {
        width: '90%',
        borderRadius: theme.radius.rd4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.approved,
        padding: theme.scale.sc16,
        height: theme.scale.sc16,
    },
    errorToastContainer: {
        width: '90%',
        borderRadius: theme.radius.rd4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.error,
        padding: theme.scale.sc16,
        height: theme.scale.sc16,
    },
    textContainer: {
        width: '85%',
        height: theme.scale.sc16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
