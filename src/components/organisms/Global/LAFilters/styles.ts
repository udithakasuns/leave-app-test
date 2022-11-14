import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale } = theme;

export const styles = StyleSheet.create({
    sortSheetContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale.vsc40,
        marginTop: scale.vsc8,
    },
    filterSheetContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale.vsc40,
    },
    filterSheetSubHeadings: {
        alignSelf: 'flex-start',
        marginLeft: scale.sc10,
    },
    chipsContainer: { alignSelf: 'flex-start' },
    commonPadding: { paddingHorizontal: 10 },
});
