import { StyleSheet } from 'react-native';
import { AvatarSize } from 'src/components/atoms';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

export default (size: AvatarSize) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: colors.tertiaryColor,
            alignItems: 'center',
            borderRadius: size / 2,
            padding: scale.vsc2,
        },
        textContainer: {
            paddingHorizontal:
                size === AvatarSize.large ? scale.sc12 : scale.sc10,
        },
    });
