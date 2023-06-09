import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

export const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: theme.scale.sc16,
        paddingVertical: theme.scale.sc28,
        marginHorizontal: theme.scale.sc20,
        borderRadius: theme.radius.rd24,
        shadowColor: theme.colors.gray300,
        shadowOpacity: 0.05,
        shadowRadius: theme.radius.rd8,
        shadowOffset: { width: 0, height: theme.scale.sc10 },
    },
    headerContainer: {
        alignSelf: 'center',
        marginBottom: theme.scale.vsc4,
    },
    headerText: {
        textAlign: 'center',
    },
});
