/* eslint-disable no-nested-ternary */
import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, radius, colors, fontSize, lineHeight } = theme;

export default (isSelected: boolean, width: number) =>
    StyleSheet.create({
        container: {
            justifyContent: 'space-around',
            backgroundColor: isSelected
                ? colors.secondaryBackground
                : colors.tertiaryColor,
            paddingHorizontal: scale.sc10,
            paddingTop: scale.sc15,
            paddingBottom: scale.sc10,
            borderRadius: radius.rd12,
            borderColor: colors.secondaryOutline,
            borderWidth: isSelected ? 1 : 0,
            margin: scale.sc4,
            width,
        },
        leaveContainer: {
            position: 'relative',
            marginBottom: -scale.sc12,
            flexDirection: 'row',
        },
        takenLeavesContainer: {
            fontSize: fontSize.fs40,
            lineHeight: lineHeight.lh50,
            textAlign: 'justify',
            paddingRight: scale.sc4,
        },
        totalLeavesContainer: {
            fontSize: fontSize.fs14,
            textAlign: 'justify',
            lineHeight: lineHeight.lh58,
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    });
