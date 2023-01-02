import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors, radius } = theme;

export default (isViewAllPage = false) =>
    StyleSheet.create({
        container: {
            flex: isViewAllPage ? 1 : 0,
            backgroundColor: isViewAllPage
                ? colors.white
                : colors.tertiaryColor,
            marginTop: isViewAllPage ? scale.sc1 : scale.sc10,
            borderRadius: radius.rd8,
            paddingHorizontal: isViewAllPage ? scale.sc10 : scale.sc16,
        },
        scrollViewContainer: {
            width: '100%',
            height: '100%',
        },
        footerContainer: {
            justifyContent: 'flex-end',
            paddingBottom: scale.vsc20,
        },
        viewAllContent: {
            marginRight: scale.sc4,
        },
        viewAllPress: {
            alignSelf: 'flex-start',
        },
        viewAllContainer: {
            paddingVertical: scale.sc6,
        },
    });
