import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

const styles = StyleSheet.create({
    container: {
        marginTop: scale.sc16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale.sc20,
    },
    nameContainer: {
        flex: 2,
    },
    designationContainer: {
        flex: 1,
    },
    avatarChipContainer: {
        padding: scale.sc1,
        borderRadius: scale.sc64,
        alignSelf: 'flex-start',
    },
    avatarChipLabel: {
        color: colors.black,
    },
});

export default styles;
