import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { colors, scale, radius } = theme;

interface Props {
    outline: boolean;
    allTeamAvailable: boolean;
}

export const useStyles = ({ outline, allTeamAvailable }: Props) =>
    StyleSheet.create({
        container: {
            backgroundColor: allTeamAvailable
                ? colors.lime600
                : colors.tertiaryColor,
            borderRadius: radius.rd4,
            paddingHorizontal: scale.sc12,
            paddingVertical: scale.sc12,
            borderWidth: outline ? 1 : 0,
            borderColor: outline ? colors.dividerColor : 'transparent',
        },
    });
