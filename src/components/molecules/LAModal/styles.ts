import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import theme from 'src/utils/theme';

export default (insets: EdgeInsets) =>
    StyleSheet.create({
        container: { flex: 1, justifyContent: 'flex-end', margin: 0 },
        safeAreaContainer: {
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: theme.radius.rd24,
            borderTopRightRadius: theme.radius.rd24,
        },
        bodyContainer: {
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: theme.radius.rd24,
            borderTopRightRadius: theme.radius.rd24,
            paddingBottom: insets.bottom,
            marginTop: theme.lineHeight.lh16,
            paddingHorizontal: theme.scale.sc20,
        },
        headerContainer: { marginTop: theme.scale.vsc20 },
    });
