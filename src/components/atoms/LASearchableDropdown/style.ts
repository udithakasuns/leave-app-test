import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

export const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        position: 'absolute',
        top: '100%',
        marginTop: -scale.sc8,
        backgroundColor: colors.white,
        marginHorizontal: scale.sc10,
        shadowColor: colors.black,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: { width: 1, height: 1 },
        borderRadius: radius.rd4,
        elevation: 2,
    },
    listRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale.sc20,
        paddingVertical: scale.sc10,
    },
    listRowSelected: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale.sc20,
        paddingVertical: scale.sc10,
        backgroundColor: colors.secondaryColor,
        borderRadius: radius.rd8,
    },
});
