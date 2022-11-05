import { StyleSheet, ViewStyle } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import theme from 'src/utils/theme';

interface Styles {
    container: ViewStyle;
    bodyContainer: ViewStyle;
}

export default (insets: EdgeInsets): Styles =>
    StyleSheet.create({
        container: { flex: 1, justifyContent: 'flex-end', margin: 0 },
        bodyContainer: {
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: theme.radius.rd24,
            borderTopRightRadius: theme.radius.rd24,
            paddingBottom: insets.bottom,
            marginTop: theme.lineHeight.lh16,
        },
    });
