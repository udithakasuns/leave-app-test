import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

interface Props {
    isViewed: boolean;
}

export const useStyles = ({ isViewed }: Props) =>
    StyleSheet.create({
        container: {},
        content: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: scale.sc20,
        },
        rightContainer: {
            flex: 1,
            marginHorizontal: scale.sc16,
        },
        rightContent: {
            flex: 1,
            flexDirection: 'row',
            marginBottom: scale.sc8,
            alignItems: 'flex-end',
        },

        messageContainer: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        overlay: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
        },
        indicator: {
            width: scale.sc10,
            height: scale.sc10,
            borderRadius: scale.sc10,
            backgroundColor: isViewed ? colors.white : colors.secondaryOutline,
            marginBottom: scale.sc2,
        },
        date: {
            color: isViewed ? colors.gray400 : colors.secondaryOutline,
        },
        devider: {
            marginTop: scale.sc16,
            borderBottomWidth: 1,
            borderColor: colors.dividerColor,
        },
    });
