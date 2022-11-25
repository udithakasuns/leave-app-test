import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import theme from 'src/utils/theme';

export default (insets: EdgeInsets) =>
    StyleSheet.create({
        container: {
            justifyContent: 'flex-end',
            margin: 0,
            marginTop: 50,
        },
        bodyContainer: {
            maxHeight: theme.height(200),
            backgroundColor: theme.colors.white,
            borderTopLeftRadius: theme.radius.rd24,
            borderTopRightRadius: theme.radius.rd24,
            paddingBottom: insets.bottom,
            marginTop: theme.pixel(3),
            paddingHorizontal: theme.scale.sc20,
        },
        headerContainer: { marginTop: theme.scale.vsc20 },
    });
