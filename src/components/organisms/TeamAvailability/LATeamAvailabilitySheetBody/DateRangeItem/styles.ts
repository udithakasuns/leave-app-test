import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

interface Props {
    selected: boolean;
}
const { colors, scale } = theme;

const styles = ({ selected }: Props) => {
    const containerBackgroundColor = selected
        ? colors.secondaryOutline
        : colors.tertiaryColor;

    return StyleSheet.create({
        container: {
            backgroundColor: containerBackgroundColor,
            paddingVertical: scale.sc12,
            paddingHorizontal: scale.sc16,
            borderRadius: scale.sc64,
            marginRight: scale.sc4,
        },
    });
};

export default styles;
